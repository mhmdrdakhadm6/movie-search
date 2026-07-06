import type { JSX } from "react/jsx-runtime";
import DetailItem from "./DetailItem";
import Empty from "./Empty";
import { useDetailMovies } from "../hooks/useDeatailMovies";
import Loader from "./Loader";
import type { Movie } from "../types/movie";
import { useEffect } from "react";

interface Detail {
  onAdd: (movie: Movie) => void;
  selectedId: string;
}

function DetailMovie({ selectedId, onAdd }: Detail): JSX.Element {
  const { data, isLoading: loading } = useDetailMovies(selectedId);
  const detailMovie = data ?? null;

  useEffect(() => {
    // ذخیره عنوان اصلی سایت برای بازگرداندن بعد از Unmount
    const originalTitle = document.title;

    if (detailMovie?.Title) {
      document.title = `Movie | ${detailMovie.Title}`;
    }

    // cleanup function برای بازگرداندن عنوان به حالت اولیه وقتی کامپوننت بسته می‌شود
    return () => {
      document.title = originalTitle;
    };
  }, [detailMovie?.Title]);

  return (
    <div className="bg-[#171717] border border-white/10 rounded-2xl p-5 flex flex-col h-full min-h-0">
      {!selectedId && <Empty />}

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {loading ? (
          <Loader />
        ) : (
          selectedId &&
          detailMovie && (
            <DetailItem onAdd={() => onAdd(detailMovie)} watch={detailMovie} />
          )
        )}
      </div>
    </div>
  );
}

export default DetailMovie;
