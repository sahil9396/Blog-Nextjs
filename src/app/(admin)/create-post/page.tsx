"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Camera, Send } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/postCreation";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useState } from "react";
import { useAdminContext } from "@/providers/admin-provider";

const formSchema = z.object({
  title: z.string().nonempty(),
  body: z.string().nonempty(),
  tag: z.string().nonempty(),
  tagDescription: z.string().optional(),
});

const slagGenerator = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

type CreatePostProps = {
  name: string;
  description: string | null;
}[];

type CategoryButtonsProps = {
  categories: CreatePostProps;
  clickHandler: (name: string, description: string) => void;
};
const CategoryButtons = ({
  categories,
  clickHandler,
}: CategoryButtonsProps) => (
  <>
    <p className="text-lg font-semibold mb-2">Categories already Exists</p>
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          type="button"
          key={category.name}
          onClick={() =>
            clickHandler(category.name, category.description || "")
          }
          className="w-fit bg-[#2c4a3c] hover:bg-[#1a2e24] text-white py-2 px-4 rounded-md"
        >
          {category.name}
        </Button>
      ))}
    </div>
  </>
);

const ImageUpload = ({
  setImages,
}: {
  setImages: (images: string) => void;
}) => (
  <CldUploadWidget
    options={{ multiple: true, maxFiles: 5 }}
    onSuccess={(results: CloudinaryUploadWidgetResults) => {
      const { info } = results;
      if (typeof info === "object") {
        setImages(info.public_id);
      }
    }}
    onError={(error) => {
      console.error("error", error);
    }}
    onQueuesEnd={(result, { widget }) => {
      console.log("onQueuesEnd", result, widget);
      // widget.close();
    }}
    uploadPreset="postData"
    config={{
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      },
    }}
  >
    {({ open }) => (
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => open()}
      >
        <Camera className="h-5 w-5" />
      </Button>
    )}
  </CldUploadWidget>
);

export default function CreatePost() {
  const [images, setImages] = useState<string>("");
  const {
    state: { tag: allCategories },
    dispatch,
  } = useAdminContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      tag: "",
      tagDescription: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const createdPost = await createPost(
        {
          ...data,
          imageId: images,
        },
        slagGenerator(data.tag.toLowerCase())
      );
      const alreadyExists = allCategories.find(
        (category) => category.name === data.tag
      );
      if (!alreadyExists) {
      }
      dispatch({
        type: "Add_CATEGORIES",
        payload: {
          id: createdPost.tagId,
          name: createdPost?.tag.name,
          slug: createdPost?.tag.slug,
          description: createdPost?.tag.description,
        },
      });
      dispatch({
        type: "Add_POST",
        payload: {
          ...createdPost,
          tag: {
            ...createdPost.tag,
            id: createdPost.tagId,
          },
        },
      });
      toast.success("Post created successfully");
    } catch (error) {
      console.log("Failed to create", error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#2c4a3c]">
            Create New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name={"title"}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input
                        className="w-full p-2 border rounded-md"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {allCategories.length > 0 && (
                <CategoryButtons
                  categories={allCategories}
                  clickHandler={(name: string, description: string) => {
                    form.setValue("tag", name);
                    form.setValue("tagDescription", description || "");
                  }}
                />
              )}

              <FormField
                name={"tag"}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input
                        className="w-full p-2 border rounded-md"
                        placeholder="Tag"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={"tagDescription"}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <Input
                        className="w-full p-2 border rounded-md"
                        placeholder="Tag Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={"body"}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <div className="relative w-full">
                        <Textarea
                          {...field}
                          placeholder="Write your message here..."
                          className="min-h-[200px] text-lg p-6"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <ImageUpload setImages={setImages} />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#2c4a3c] hover:bg-[#1a2e24] p-6 text-lg"
              >
                <Send className="mr-2 h-5 w-5" /> Publish Post
              </Button>
            </form>
          </Form>
          {images && (
            <CldImage
              width="460"
              height="400"
              src={images}
              sizes="100vw"
              alt="Uploaded image"
              className="mt-4 mx-auto"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
