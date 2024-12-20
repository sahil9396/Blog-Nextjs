import { Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-8">
            About Archana Shinde
          </h1>

          <div className="prose prose-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">
              Meet Archana Shinde
            </h2>
            <p className="text-muted-foreground mb-6">
              Hello! I&apos;m Archana Shinde, a seasoned Occult Scientist and
              Practitioner. I specialize in a variety of disciplines including
              Reiki, Pranic Healing, Crystal Healing, Astrology, Vastu Shastra,
              Acupressure, Chakra Healing, Aura Cleansing, Color Therapy, Mantra
              Healing, Mudra Healing, and Home Remedies.
            </p>

            <h2 className="text-2xl font-serif font-bold mb-4">My Journey</h2>
            <p className="text-muted-foreground mb-6">
              Over the years, I have dedicated my life to understanding and
              mastering these ancient sciences. My passion is to help people
              align with their inner selves, heal from within, and achieve
              harmony in all aspects of their lives. Each discipline I practice
              has its unique approach to healing, and I strive to bring a
              holistic solution to every individual.
            </p>

            <h2 className="text-2xl font-serif font-bold mb-4">
              Services Offered
            </h2>
            <ul className="list-disc pl-5 text-muted-foreground mb-6">
              <li>Reiki Healing</li>
              <li>Pranic Healing</li>
              <li>Crystal Healing</li>
              <li>Astrology Readings</li>
              <li>Vastu Shastra Consultations</li>
              <li>Chakra Healing & Aura Cleansing</li>
              <li>Acupressure & Color Therapy</li>
              <li>Mantra & Mudra Healing</li>
              <li>Customized Home Remedies</li>
            </ul>

            <div className="bg-card rounded-lg p-8 border mt-8">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-4">
                Ready to start your healing journey? Feel free to reach out for
                consultations, sessions, or collaborations. Let’s work together
                to bring balance and positivity to your life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
