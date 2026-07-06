import type { JSX } from "react/jsx-runtime";
import { FiSearch } from "react-icons/fi";
import RecentSearch from "./RecentSearch";
import { useRef, useEffect } from "react";
import type { Movie, Recent } from "../types/movie";

type HeaderProps = {
  movie: Movie[];
  searchMovie: string;
  setSearchMovie: (value: string) => void;
  onSearch: () => void;
  recent: Recent[];
  isOpenRecent: boolean;
  showRecent: () => void;
  onDelete: (id: string) => void;
  onRecentSearch: (id: string) => void;
  showWatchList: () => void
};

function Header({
  movie,
  searchMovie,
  setSearchMovie,
  onSearch,
  recent,
  isOpenRecent,
  showRecent,
  onRecentSearch,
  onDelete,
  showWatchList
}: HeaderProps): JSX.Element {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        if (isOpenRecent) {
          showRecent();
        }
      }
    }

    if (isOpenRecent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenRecent, showRecent]);

  return (
    <header className="w-full sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Logo + Brand - ریسپانسیو شده */}
        <div onClick={showWatchList} className="flex items-center gap-3 cursor-pointer select-none shrink-0">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-xl md:text-2xl">🍿</span>
          </div>

          {/* مخفی شدن متن در موبایل برای باز شدن فضا */}
          <div className="hidden sm:flex flex-col leading-tight">
            <h1 className="text-white text-lg md:text-2xl font-bold tracking-wide">
              usePopcorn
            </h1>
            <span className="text-[10px] md:text-xs text-gray-400">
              discover your next movie
            </span>
          </div>
        </div>

        {/* Search Box - ریسپانسیو شده */}
        <div className="flex-1 max-w-2xl flex items-center gap-2 md:gap-3">
          <div ref={searchContainerRef} className="relative group flex-1">
            <FiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base md:text-lg group-focus-within:text-white transition-colors duration-300" />

            <input
              onClick={showRecent}
              onKeyDown={onKeyDown}
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              type="text"
              placeholder="Search..."
              className="
                w-full
                pl-10
                md:pl-12
                pr-4
                py-2.5
                md:py-3
                rounded-xl
                md:rounded-2xl
                bg-white/5
                border
                border-white/10
                text-sm
                md:text-base
                text-white
                placeholder:text-gray-500
                outline-none
                transition-all
                duration-300
                backdrop-blur-md
                focus:border-orange-400/50
                focus:bg-white/10
                focus:shadow-lg
                focus:shadow-orange-500/10
              "
            />

              <div className="absolute top-full left-0 w-full mt-2 z-50">
                <RecentSearch
                  isOpenRecent={isOpenRecent}
                  onDelete={onDelete}
                  onSearch={onRecentSearch}
                  recent={recent}
                />
              </div>
          </div>

          {/* Search Button - در موبایل فقط آیکون می‌ماند */}
          <button
            onClick={() => onSearch()}
            className="
              h-[42px]
              md:h-[50px]
              px-4
              md:px-5
              rounded-xl
              md:rounded-2xl
              bg-gradient-to-r
              from-orange-500
              to-red-500
              text-white
              flex
              items-center
              justify-center
              gap-2
              font-medium
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-lg
              hover:shadow-orange-500/30
              active:scale-[0.98]
              shrink-0
            "
          >
            <FiSearch className="text-lg" />
            <span className="hidden lg:block">Search</span>
          </button>
        </div>

        {/* بخش سمت راست - فقط در دسکتاپ */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
            Trending 🎬
          </div>
        </div>

        {/* نمایش تعداد نتایج - فقط در تبلت و دسکتاپ */}
        <div
          className="
            hidden md:flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-xl
            bg-white/5
            border
            border-white/10
            text-xs
            md:text-sm
            text-gray-300
            shrink-0
          "
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="hidden lg:inline">{movie.length} results found</span>
          <span className="lg:hidden">{movie.length}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
