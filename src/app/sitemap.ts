import { getPost } from "@/lib/getThings";

export default async function sitemap() {
  const testData = await getPost();
  const baseUrl = "https://AstroArt.com";

  const postUrls = testData.map((post) => ({
    url: `${baseUrl}/post/${post.id}`,
    lastModified: new Date(post.updatedAt),
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postUrls,
  ];
}
