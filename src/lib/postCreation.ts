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
  let categoryExist = null;
  try {
    categoryExist = await db.category.findUnique({
      where: {
        name: data.tag.trim(),
      },
    });
  } catch (error) {
    console.log("Failed to create post", error);
    throw new Error("Failed to create post");
  }

  let postCreation = null;

  try {
    if (categoryExist) {
      postCreation = await db.post.create({
        data: {
          title: data.title,
          body: data.body,
          imageUrl: data.imageId,
          author: {
            connect: {
              email: process.env.AUTHOR_EMAIL || "random@gmail.com",
            },
          },
          tag: {
            connect: {
              name: data.tag,
              slug: slug,
            },
          },
        },
        include: {
          tag: {
            select: {
              name: true,
              slug: true,
              description: true,
            },
          },
        },
      });
    } else {
      postCreation = await db.post.create({
        data: {
          title: data.title,
          body: data.body,
          author: {
            connect: {
              email: process.env.AUTHOR_EMAIL || "random@gmail.com",
            },
          },
          tag: {
            create: {
              name: data.tag,
              slug,
              description: data.tagDescription,
            },
          },
        },
        include: {
          tag: {
            select: {
              name: true,
              slug: true,
              description: true,
            },
          },
        },
      });
    }

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
