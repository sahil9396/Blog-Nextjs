import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://AstroArt.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/categories", "/about", "/contact","/home"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
