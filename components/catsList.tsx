"use client";
import { Cat } from "@/app/api/api";
import CatsListItem from "./catsListItem";
import { getCats } from "@/app/api/api";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export interface CatsLstProps {
  fetchedCats: Cat[];
}

const CatsList = ({ fetchedCats }: CatsLstProps) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname();

  const loadMoreCats = async () => {
    setLoading(!loading);
    try {
      const moreCats = await getCats();
      const prevCats = JSON.parse(localStorage.getItem("cats") || "[]");
      setCats([...prevCats, ...moreCats]);
      localStorage.setItem("cats", JSON.stringify([...prevCats, ...moreCats]));
      setLoading(!loading);
    } catch (error) {
      console.error("Error loading more cats:", error);
    }
  };

  useEffect(() => {
    const catsFromLocalStorage = JSON.parse(
      localStorage.getItem("cats") || "[]"
    );
    if (catsFromLocalStorage.length === 0) {
      setCats(fetchedCats);
      localStorage.setItem("cats", JSON.stringify(fetchedCats));
    } else {
      setCats(catsFromLocalStorage);
      localStorage.setItem("cats", JSON.stringify(catsFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreCats();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleLikeToggle = (catId: string) => {
    setCats((prevCats) => {
      const updatedCats = prevCats.map((cat) => {
        if (cat.id === catId) {
          const isLiked = cat.isLiked === undefined ? true : !cat.isLiked;
          return { ...cat, isLiked };
        }
        return cat;
      });
      localStorage.setItem("cats", JSON.stringify(updatedCats));
      return updatedCats;
    });
  };

  return (
    <div className='container justify-self-center mx-auto my-5'>
      <div className='grid grid-cols-5 gap-12'>
        {pathname === "/"
          ? cats.map(({ id, url, isLiked }: Cat) => (
              <CatsListItem
                key={id}
                url={url}
                isLiked={isLiked}
                onLikeToogle={() => handleLikeToggle(id)}
              />
            ))
          : cats
              .filter(({ isLiked }: Cat) => isLiked)
              .map(({ id, url, isLiked }: Cat) => (
                <CatsListItem
                  key={id}
                  url={url}
                  isLiked={isLiked}
                  onLikeToogle={() => handleLikeToggle(id)}
                />
              ))}
      </div>
      <div className='grid my-5'>{loading && <p className="justify-self-center">Загружаются новые котики...</p>}</div>
    </div>
  );
};

export default CatsList;
