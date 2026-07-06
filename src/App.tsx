import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import type { JSX } from "react/jsx-runtime";
import MovieBox from "./components/MovieBox";
import { useState } from "react";
import { type Movie, type Recent } from "./types/movie";
import { useMovie } from "./hooks/useMovie";
import { useLocalStorage } from "./hooks/useLocalStorage";
import WatchlistModal from "./components/WatchlistModal";
import DetailMovie from "./components/DetailMovie";
import toast, { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";

function App(): JSX.Element {
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [query, setQuery] = useState<string>("Avatar");
  const [recentSearch, setRecentSearch] = useLocalStorage<Recent[]>(
    "recent",
    [],
  );
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [watchList, setWatchList] = useLocalStorage<Movie[]>("watchlist", []);
  const [isRecentSearch, setIsRecentSearch] = useState<boolean>(false);
  const [isClosedByUser, setIsClosedByUser] = useState<boolean>(false);
  const [isWatch, setIswatch] = useState<boolean>(false);
  const { data, isLoading: loading, error } = useMovie(query);

  const movies = data?.Search ?? [];

  const isMovie = data ? data.Response === "False" && !isClosedByUser : false;

  const onSubmitSearch = (): void => {
    if (!searchMovie.trim()) return;
    const term = searchMovie;

    setQuery(term);
    setSearchMovie("");
    setIsClosedByUser(false);

    const newTxt: Recent = {
      search: term,
      id: crypto.randomUUID(),
    };

    setRecentSearch((prev) => [newTxt, ...prev]);
    setIsRecentSearch(false);
  };

  const handleRecentSearch = (id: string): void => {
    const onSearch = recentSearch.find((recent) => recent.id === id);
    if (onSearch) {
      setQuery(onSearch.search);
      setIsRecentSearch(false);
      setIsClosedByUser(false);
    }
  };

  const handlelRemove = (id: string): void => {
    setRecentSearch((recent) => recent.filter((index) => index.id !== id));
    if (recentSearch.length === 1) {
      setIsRecentSearch(false);
    }
  };

  const closeAndSetQuery = (): void => {
    setIsClosedByUser(true);
    setQuery("Avatar");
  };

  const handleSelectedId = (id: string): void => {
    setSelectedId(id);
  };

  const handleAddToWatchList = (movie: Movie): void => {
    // Check if movie already exists in watchlist
    const exists = watchList.some((item) => item.imdbID === movie.imdbID);
    if (exists) {
      toast.error("This movie is already in your watchlist!");
      return;
    } else {
      toast.success("Add to watch list!");
    }

    // Create a Movie object from DetailMovie

    setWatchList((prev) => [movie, ...prev]);
  };

  const removeToWatchList = (id: string): void => {
    setWatchList((prev) => prev.filter((index) => index.imdbID !== id));
  };

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Header
        onDelete={handlelRemove}
        onRecentSearch={handleRecentSearch}
        isOpenRecent={isRecentSearch}
        showRecent={() => setIsRecentSearch((prev) => !prev)}
        recent={recentSearch}
        movie={movies}
        searchMovie={searchMovie}
        setSearchMovie={setSearchMovie}
        onSearch={onSubmitSearch}
        showWatchList={() => setIswatch(true)}
      />
      <MovieBox error={error}>
        <Movies
          onSelect={handleSelectedId}
          loading={loading}
          isMovie={isMovie}
          onClose={closeAndSetQuery}
          movies={movies}
        />
        <DetailMovie
          onAdd={handleAddToWatchList}
          selectedId={selectedId ?? ""}
        />
      </MovieBox>
      <WatchlistModal
        onRemove={removeToWatchList}
        watchlist={watchList}
        isOpen={isWatch}
        onClose={() => setIswatch(false)}
        onAdd={() => {
          setIswatch(false);
          // Optional: focus on search input
        }}
      />
      {/* <Footer movie={movies} /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // استایل‌های پایه برای تم تاریک مدرن و افکت شیشه‌ای
          style: {
            background: "rgba(23, 23, 23, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "14px 20px",
            borderRadius: "16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            maxWidth: "420px",
          },
          // شخصی‌سازی جداگانه بر اساس نوع توست
          success: {
            iconTheme: {
              primary: "#10B981", // سبز زمردی مدرن
              secondary: "#171717",
            },
            style: {
              borderLeft: "4px solid #10B981", // خط تاکید سمت چپ برای جلوه بیشتر
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444", // قرمز مرجانی
              secondary: "#171717",
            },
            style: {
              borderLeft: "4px solid #EF4444",
            },
          },
          // تنظیم مدت زمان نمایش توست به صورت بهینه
          duration: 4000,
        }}
      />{" "}
    </div>
  );
}

export default App;
