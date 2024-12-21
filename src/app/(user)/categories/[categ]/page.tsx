import SinglePostCard from "@/components/SinglePostCard";
import { getPostByCat } from "@/lib/getThings";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: { categ: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = params.categ;
    const posts = await getPostByCat(slug);
    return {
      openGraph: {
        title: `${posts[0].tag.name} - AstroArt`,
        description: `Explore articles on ${posts[0].tag.description}`,
        images: posts[0].imageUrl ? [posts[0].imageUrl] : [""],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      openGraph: {
        title: "No category found",
        description: "No category found",
        images: [""],
      },
    };
  }
}

export default async function Page({ params }: Props) {
  const slug = params.categ;
  const postList = await getPostByCat(slug);

  if (!postList)
    return (
      <div className="container h-screen mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">No posts found</h1>
        <Link href="/">
          <a className="text-primary">Go back home</a>
        </Link>
      </div>
    );

  return (
    <>
      <div className="container min-h-screen mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {postList.map((post) => (
            <SinglePostCard
              key={post.title}
              id={post.id}
              title={post.title}
              date={new Date()}
              postDescription={post.body}
              image={post.imageUrl}
              category={post.tag.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
