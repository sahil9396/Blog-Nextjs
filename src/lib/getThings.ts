"use server";
import { unstable_cache as cache } from "next/cache";
import db from "./db";

export const getPost = cache(async () => {
  try {
    const postCreation = await db.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        tag: true,
      },
    });
    return postCreation;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw new Error("Failed to fetch posts");
  }
}, ["allposts"]);

export const getCategories = cache(async () => {
  try {
    console.log("Fetching categories");
    const fetchedCategories = await db.category.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
    return fetchedCategories;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw new Error("Failed to fetch categories");
  }
}, ["allTags"]);

export const getPostByCat = async (category: string) => {
  try {
    const post = await db.post.findMany({
      where: {
        tag: {
          slug: category,
        },
      },
      include: {
        tag: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return post;
  } catch (error) {
    console.error(`Failed to fetch posts for category: ${category}`, error);
    throw new Error(`Failed to fetch posts for category: ${category}`);
  }
};

export const getPostById = async (id: number) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        tag: true,
      },
    });
    return post;
  } catch (error) {
    console.error(`Failed to fetch post with id: ${id}`, error);
    throw new Error(`Failed to fetch post with id: ${id}`);
  }
};

export const getAllTagsAndPost = cache(async () => {
  try {
    console.log("From getAllTagsAndPost");
  
    const post = await db.category.findMany({
      include: {
        posts: {
          include: {
            tag: true,
          },
          orderBy: {
            updatedAt: "asc",
          },
        },
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Failed to fetch all posts and tags", error);
    throw new Error("Failed to fetch all posts and tags");
  }
}, ["allTagsAndPost"]);
