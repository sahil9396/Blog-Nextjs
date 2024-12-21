import Link from "next/link";
import React from "react";
import ImageCom from "./ImageCom";
import SharingButton from "./sharingButton";

interface SinglePostCardProps {
  id: number;
  title: string;
  postDescription: string;
  image?: string | null;
  date: Date;
  category?: string;
}

const SinglePostCard: React.FC<SinglePostCardProps> = ({
  id,
  title,
  postDescription,
  image,
  date,
  category,
}) => {
  return (
    <div className="w-full flex flex-col-reverse items-center md:flex-row rounded-lg shadow-md bg-white transition overflow-hidden">
      <div
        className={`p-4 flex flex-col justify-between w-full ${
          image ? "md:w-2/3" : "md:w-full"
        }`}
      >
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <Link href={`/post/${id}`}>
              <h2 className="text-lg md:text-xl font-semibold text-primary line-clamp-2 break-words lg:hover:underline">
                {title}
              </h2>
            </Link>
            <span className="text-sm text-muted-foreground">
              {new Date(date).toDateString()}
            </span>
          </div>
          {category && (
            <span className="text-xs font-medium text-black/45 py-1 rounded-full inline-block mb-3">
              {category}
            </span>
          )}
          <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
            {postDescription.slice(0, 100)}...
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/post/${id}`}
            className="text-sm md:text-base font-medium text-primary lg:hover:underline"
          >
            Read More
          </Link>
          <div>
            <SharingButton id={id} />
          </div>
        </div>
      </div>
      <div
        className={`
          ${image ? "md:w-1/3" : "hidden"} w-full h-48 md:h-[11rem]`}
      >
        <ImageCom image={image} />
      </div>
    </div>
  );
};

export default SinglePostCard;