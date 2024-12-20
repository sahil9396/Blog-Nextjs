import "./globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

const baseUrl = "https://AstroArt.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AstroArt",
    template : `%s | AstroArt`
  },
  openGraph:{
    title: "AstroArt",
    description: "Explore articles on mindfulness, personal growth, and creative living.",
    images: [""]
  }
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans relative bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
