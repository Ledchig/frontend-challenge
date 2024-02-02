"use client";
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
  const [altText, setAltText] = useState<string>(
    isLiked ? "Liked" : "Not Liked"
  );
  const [img, setImg] = useState<string>(isLiked ? liked : unliked);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    setAltText(isLiked ? "Liked" : "Not Liked");
    setImg(isLiked ? liked : unliked);
    setImg(isHover ? liked : unliked);
  }, [isLiked, isHover]);

  return (
    <div className='relative'>
      <div className="object-cover hover:shadow-2xl hover:-translate-y-1 duration-300">
        <img
        className='w-72 h-72 object-cover'
        src={url}
        alt='Cat'
      />
      <button className='w-10 h-10 absolute right-3 bottom-3'>
        <Image
          src={img}
          alt={altText}
          onClick={() => onLikeToogle()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </button>
      </div>
      
    </div>
  );
};

export default CatsListItem;
