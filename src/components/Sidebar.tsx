import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-xl font-serif font-bold mb-4">About Me</h3>
        <div className="aspect-square w-32 mx-auto mb-4 overflow-hidden rounded-full">
          <Image
            src={process.env.ADMIN_IMAGE_URL || ""}
            alt="Author"
            width={1024}
            height={1024}
            className="object-cover object-top w-32 h-32"
          />
        </div>
        <p className="text-muted-foreground mb-4">
          Hello! I&apos;m Archana Shinde, a seasoned Occult Scientist and
          Practitioner. I specialize in a variety of disciplines including
          Reiki, Pranic Healing, Crystal Healing, Astrology, Vastu Shastra,
          Acupressure, Chakra Healing, Aura Cleansing, Color Therapy, Mantra
          Healing, Mudra Healing, and Home Remedies.
        </p>
      </div>
    </div>
  );
}
