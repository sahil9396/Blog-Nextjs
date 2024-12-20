"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

type Props = {
  image: string | null | undefined;
};

const ImageCom = ({ image }: Props) => {
  if (!image) return null;
  return (
    <CldImage
      width="1000"
      height="1000"
      src={image}
      alt="Uploaded image"
      className="object-cover w-full h-full"
    />
  );
};

export default ImageCom;
