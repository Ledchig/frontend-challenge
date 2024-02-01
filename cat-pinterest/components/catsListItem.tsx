'use client'
import liked from "@/public/liked.svg";
import unliked from "@/public/unliked.svg";
import Image from "next/image";
import { useState, useEffect } from "react";

interface MyProps {
  url: string;
  isLiked: boolean;
  onLikeToogle: () => void;
}

const CatsListItem = ({ url, isLiked, onLikeToogle }: MyProps) => {
  const [altText, setAltText] = useState<string>(isLiked ? "Liked" : "Not Liked");
  const [img, setImg] = useState<string>(isLiked ? liked : unliked);

  useEffect(() => {
    setAltText(isLiked ? "Liked" : "Not Liked");
    setImg(isLiked ? liked : unliked);
  }, [isLiked]);

  return (
    <div className='relative'>
      <img className='w-72 h-72 object-cover' src={url} alt='Cat' />
      <button className='w-10 h-10 absolute right-3 bottom-3'>
        <Image
          src={img}
          alt={altText}
          onClick={() => onLikeToogle()}
        />
      </button>
    </div>
  );
};

export default CatsListItem;
