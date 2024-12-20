"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import db from "./db";
import {
  deleteAllImage,
  deleteImageById,
} from "@/utils/imageDeletionFromCloudnary";

export const deleteAllTags = async () => {
  try {
    const allPost = db.post.deleteMany({});
    const allCategories = db.category.deleteMany({});
    const doneDeleted = db.$transaction([allPost, allCategories]);

    const imageAlldelete = deleteAllImage();

    const doneThings = await Promise.all([doneDeleted, imageAlldelete]);

    console.log(doneThings + "doneThings from deleteAllTags");

    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/home");

    revalidateTag("allposts");
    revalidateTag("allTags");
    revalidateTag("allTagsAndPost");
    return doneDeleted;
  } catch (error) {
    console.log("Failed to delete all tags", error);
    throw new Error("Failed to delete all tags");
  }
};

export const deleteTagByName = async (tagId: number) => {
  try {
    const postDeleteWithCategory = db.post.deleteMany({
      where: {
        tag: {
          id: tagId,
        },
      },
    });
    const categoryDelete = db.category.deleteMany({
      where: {
        id: tagId,
      },
    });
    const deleteTag = db.$transaction([
      postDeleteWithCategory,
      categoryDelete,
    ]);

    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/home");

    revalidateTag("allposts");
    revalidateTag("allTags");
    revalidateTag("allTagsAndPost");
    return deleteTag;
  } catch (error) {
    console.log("Failed to delete tag", error);
    throw new Error("Failed to delete tag");
  }
};

export const deleteAllPosts = async () => {
  try {
    const postAlldelete = db.post.deleteMany({});
    const imageAlldelete = deleteAllImage();

    const doneThings = await Promise.all([postAlldelete, imageAlldelete]);
    console.log(doneThings + "doneThings from deleteAllPosts");
    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/home");

    revalidateTag("allposts");
    revalidateTag("allTags");
    revalidateTag("allTagsAndPost");
  } catch (error) {
    console.log("Failed to delete all posts", error);
    throw new Error("Failed to delete all posts");
  }
};

export const deltePostByTitle = async (data: {
  title: string;
  body: string;
  tag: string;
  tagDescription: string | null;
  imageId: string | null;
}) => {
  try {
    const postDelete = db.post.deleteMany({
      where: {
        title: data.title,
        body: data.body,
        imageUrl: data.imageId,
        author: {
          email: "Jane@gmail.com",
        },
        tag: {
          name: data.tag,
          description: data.tagDescription,
        },
      },
    });

    const imageDelete = data.imageId && deleteImageById(data.imageId);

    const doneThings = await Promise.all([postDelete, imageDelete]);

    console.log(doneThings + "doneThings from deletePost");

    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/home");

    revalidateTag("allposts");
    revalidateTag("allTags");
    revalidateTag("allTagsAndPost");
  } catch (error) {
    console.log("Failed to delete post", error);
    throw new Error("Failed to delete post");
  }
};
