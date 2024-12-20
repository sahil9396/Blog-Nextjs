"use client";
import React from "react";
import SinglePostCard from "@/components/SinglePostCard";
import { useAdminContext } from "@/providers/admin-provider";
import { Card } from "@/components/ui/card";

const Page = () => {
  const { isLoading, posts, tag } = useAdminContext().state;
  return (
    <div className="min-h-screen p-2">
      {isLoading ? (
        <>Loading...</>
      ) : posts.length === 0 ? (
        <div className="w-full flex flex-col gap-6 p-4 md:px-8 md:py-4">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              No posts or tags found
            </p>
          </Card>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 ">
          <div className="w-full flex gap-5 overflow-x-auto py-2 ">
            {tag.map((tag) => (
              <p
                key={tag.id}
                className="bg-gray-200 rounded-md p-2 whitespace-nowrap"
              >
                {tag.name}
              </p>
            ))}
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-3">
            {posts.map((post) => (
              <SinglePostCard
                key={post.title}
                id={post.id}
                title={post.title}
                date={post?.updatedAt}
                postDescription={post.body}
                image={post.imageUrl}
                category={post.tag.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
