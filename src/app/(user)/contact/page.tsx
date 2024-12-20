"use client";

import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground mb-8">
                Have a question or suggestion? We&apos;d love to hear from you.
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>

              <div className="space-y-6">
                <ContactInfo
                  title="Email"
                  details="Jane@gmail.com"
                >
                  <Mail className="h-5 w-5" />
                </ContactInfo>
              </div>
            </div>

            {/* <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form> */}
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactInfo({
  title,
  details,
  children,
}: {
  title: string;
  details: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <div className="p-2 bg-secondary rounded-md mr-4">{children}</div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-muted-foreground">{details}</p>
      </div>
    </div>
  );
}

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  subject: z.string().nonempty(),
  message: z.string().nonempty(),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name={"name"}
          key={"name"}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2 flex justify-center items-center gap-2">
              <FormControl>
                <Input
                  className="w-full p-2 border rounded-md"
                  placeholder="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={"email"}
          key={"email"}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2 flex justify-center items-center gap-2">
              <FormControl>
                <Input
                  className="w-full p-2 border rounded-md"
                  placeholder="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={"subject"}
          key={"subject"}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2 flex justify-center items-center gap-2">
              <FormControl>
                <Input
                  className="w-full p-2 border rounded-md"
                  placeholder="subject"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={"message"}
          key={"message"}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2 flex justify-center items-center gap-2">
              <FormControl>
                <Textarea
                  className="w-full px-4 py-2 rounded-md border bg-background"
                  placeholder="message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#2c4a3c] hover:bg-[#1a2e24] p-6 text-lg"
        >
          {/* <Send className="mr-2 h-5 w-5" />  */}
          Publish Post
        </Button>
      </form>
    </Form>
  );
};
