"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

type Props = {
  id: number;
};

const SharingButton = ({ id }: Props) => {
  const [copied, setCopied] = useState(false);

  const sendingUrl = `https://localhost:3000/post/${id}`;

  const handleClick = () => {
    const url = `whatsapp://send?text=${sendingUrl}`;
    window.open(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sendingUrl);
    setCopied(true);
  };

  return (
    <div className="w-full flex items-center justify-center gap-2">
      <Button
        variant={copied ? "default" : "secondary"}
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <Button
        className="w-full h-full "
        variant={"link"}
        onClick={handleClick}
      >
        <Image
          src={
            "data:image/png;base64,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"
          }
          width={30}
          height={30}
          alt="Share post"
          className="w-10"
        />
      </Button>
    </div>
  );
};

export default SharingButton;
