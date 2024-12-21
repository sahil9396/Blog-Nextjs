"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import db from "./db";

export const createPost = async (
  data: {
    title: string;
    body: string;
    tag: string;
    tagDescription?: string;
    imageId?: string;
  },
  slug: string
) => {
  try {
    const postCreation = await db.post.create({
      data: {
        title: data.title,
        body: data.body,
        imageUrl: data.imageId,
        author: {
          connect: {
            email: process.env.ADMIN_EMAIL || "random@gmail.com",
          },
        },
        tag: {
          connectOrCreate: {
            where: {
              name: data.tag.trim(),
            },
            create: {
              name: data.tag.trim(),
              slug,
              description: data.tagDescription,
            },
          },
        },
      },
      include: {
        tag: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/home");

    revalidateTag("allposts");
    revalidateTag("allTags");
    revalidateTag("allTagsAndPost");
    return postCreation;
  } catch (error) {
    console.log("Failed to create post", error);
    throw new Error("Failed to create post");
  }
};
