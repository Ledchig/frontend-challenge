import CatsList from "@/components/catsList";
import Header from "@/components/header";
import { getCats } from "@/app/api/api";

const LikedCats = async () => {
  const fetchedCats = await getCats();

  return (
    <>
      <Header />
      <main>
        <CatsList fetchedCats={fetchedCats} />
      </main>
    </>
  );
};

export default LikedCats;
