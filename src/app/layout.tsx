import { keywords } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

const baseUrl = process.env.BASE_URL || "";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  keywords: keywords,
  title: {
    default: "Archana-AstroArt",
    template: `%s | Archana-AstroArt`,
  },
  openGraph: {
    title: "Archana-AstroArt",
    description:
      "Here you can find all the information about Archana's AstroArt, a person that loves to help people with astrology .",
    images: [""],
  },
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
