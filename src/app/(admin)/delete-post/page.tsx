"use client";
import { useAdminContext } from "@/providers/admin-provider";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  deleteAllPosts,
  deleteAllTags,
  deleteTagByName,
  deltePostByTitle,
} from "@/lib/postMutate";
import { Card } from "@/components/ui/card";

const AdminActions = () => {
  const {
    state: { posts: allPosts, tag: allTags, isLoading },
    dispatch,
  } = useAdminContext();
  const [selectedPostId, setSelectedPostId] = React.useState<number>(NaN);
  const [selectedTagId, setSelectedTagId] = React.useState<number>(NaN);
  const handleDeletePost = async () => {
    if (!selectedPostId) return toast.error("Select a Post");
    const thatPost = allPosts.find((post) => post.id === selectedPostId);
    if (!thatPost) return toast.error("Post not found");
    try {
      await deltePostByTitle({
        title: thatPost.title,
        body: thatPost.body,
        tag: thatPost.tag.name,
        tagDescription: thatPost.tag.description,
        imageId: thatPost.imageUrl,
      });
      console.log(`Deleting post with ID: ${selectedPostId}`);
      const updatedPostsList = allPosts.filter(
        (post) => post.id !== selectedPostId
      );
      setSelectedPostId(NaN);
      dispatch({ type: "SET_POSTS", payload: updatedPostsList });
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting the post");
    }
  };

  const handleDeleteAllPosts = async () => {
    if (!allPosts.length) return toast.error("No Posts to delete");
    try {
      await deleteAllPosts();
      dispatch({ type: "SET_POSTS", payload: [] });
      toast.success("All posts deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting all posts");
    }
  };

  const handleDeleteTag = async () => {
    if (!selectedTagId) return toast.error("Select a Tag");
    const thatTag = allTags.find((tag) => tag.id === selectedTagId);
    if (!thatTag) return toast.error("Tag not found");
    try {
      await deleteTagByName(selectedTagId);
      console.log(`Deleting tag with ID: ${selectedTagId}`);
      setSelectedTagId(NaN);
      const updatedTagsList = allTags.filter((tag) => tag.id !== selectedTagId);
      const updatedPostsList = allPosts.filter(
        (post) => post.tagId !== selectedTagId
      );
      dispatch({ type: "SET_CATEGORIES", payload: updatedTagsList });
      dispatch({ type: "SET_POSTS", payload: updatedPostsList });
      toast.success("Tag deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting the tag");
    }
  };

  const handleDeleteAllTags = async () => {
    if (!allTags.length) return toast.error("No Tags to delete");
    try {
      await deleteAllTags();
      dispatch({ type: "SET_CATEGORIES", payload: [] });
      dispatch({ type: "SET_POSTS", payload: [] });
      toast.success("All tags deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting all tags");
    }
  };

  if (isLoading) return <>loading...</>;

  if (!allPosts.length && !allTags.length) {
    return (
      <div className="flex flex-col gap-6 p-4 md:px-8 md:py-4">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            No posts or tags found
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md md:max-w-full flex flex-col justify-center items-center gap-6 p-6 rounded-lg mx-auto">
      <div className="w-full flex flex-col md:flex-row gap-4">
        {allPosts.length > 0 && (
          <div className="w-full flex justify-center items-center gap-4">
            <Select onValueChange={(value) => setSelectedPostId(+value)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={selectedPostId || "Select a Post to Delete"}
                />
              </SelectTrigger>
              <SelectContent>
                {allPosts.map((post) => (
                  <SelectItem key={post.id} value={post.id.toString()}>
                    {post.title.slice(0, 40)} ({post.tag.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleDeletePost}
              disabled={!selectedPostId}
              variant={"secondary"}
              className={`${
                selectedPostId
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-300 cursor-not-allowed "
              }`}
            >
              Delete Post
            </Button>
          </div>
        )}

        {allTags.length > 0 && (
          <div className="w-full flex justify-center items-center gap-4">
            <Select onValueChange={(value) => setSelectedTagId(+value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Tag to Delete" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id.toString()}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleDeleteTag}
              disabled={!selectedTagId}
              variant={"secondary"}
              className={`${
                selectedTagId
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-300 cursor-not-allowed "
              }`}
            >
              Delete Tag
            </Button>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4">
        {allPosts.length > 0 && (
          <Button
            onClick={handleDeleteAllPosts}
            variant={"secondary"}
            className="bg-red-500 hover:bg-red-600 w-full text-white"
          >
            Delete All Posts
          </Button>
        )}
        {allTags.length > 0 && (
          <Button
            onClick={handleDeleteAllTags}
            variant={"secondary"}
            className="bg-red-500 hover:bg-red-600 w-full text-white"
          >
            Delete All Tags
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminActions;
