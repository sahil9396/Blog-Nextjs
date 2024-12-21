import ImageCom from "@/components/ImageCom";
import SharingButton from "@/components/sharingButton";
import { getPostById } from "@/lib/getThings";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { posttitle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const slug = params.posttitle;
    const posts = await getPostById(parseInt(slug));
    if (!posts) {
      return {
        openGraph: {
          title: "No posts found",
          description: "No posts found",
          images: [""],
        },
      };
    }
    return {
      openGraph: {
        title: `${posts.tag.name} - AstroArt`,
        description: `Explore articles on ${posts.tag.description}`,
        images: posts.imageUrl ? [posts.imageUrl] : [""],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      openGraph: {
        title: "No posts found",
        description: "No posts found",
        images: [""],
      },
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ posttitle: number }>;
}) {
  const slug = (await params).posttitle;
  const postList = await getPostById(slug);

  if (!postList) return null;

  const { title, body, tag, imageUrl, updatedAt, id } = postList;

  return (
    <div className="max-w-2xl min-h-screen mx-auto rounded-lg p-8 flex flex-col gap-6">
      <header>
        <h1 className="text-3xl md:text-5xl max-w-full break-words h-auto font-bold text-primary ">
          {title}
        </h1>
      </header>

      <section className="flex justify-between items-center text-wrap md:gap-2">
        <div className="w-full hidden md:flex gap-2 items-center">
          <h2 className="text-lg font-medium">Tags:</h2>
          <p className="text-md font-medium my-auto text-black/50 rounded-full">
            #{tag.name}
          </p>
        </div>

        <div className="w-full flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <button
              className="text-primary hover:text-primary-dark transition"
              aria-label="Like this post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 9l-2 2m0 0l-2-2m2 2V4m0 10v6a2 2 0 002 2h4a2 2 0 002-2v-6m-6 6h-4a2 2 0 01-2-2v-2a2 2 0 012-2h2l2 2m0-2V4"
                />
              </svg>
            </button>
            <span className="text-muted-foreground">
              {new Date(updatedAt).toDateString()}
            </span>
          </div>
        </div>
        <SharingButton id={id} />
      </section>

      <div className={`${imageUrl ? "w-full h-48 md:h-full" : "hidden"}`}>
        <ImageCom image={imageUrl} />
      </div>

      <article className="w-full">
        {body.split("\n").map((para, index) => (
          <React.Fragment key={index}>
            <p className="break-words w-full">{para}</p>
            <br />
          </React.Fragment>
        ))}
      </article>
    </div>
  );
}
