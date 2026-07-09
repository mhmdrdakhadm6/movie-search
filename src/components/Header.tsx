import type { JSX } from "react/jsx-runtime";
import { FiSearch, FiMic, FiMicOff } from "react-icons/fi";
import RecentSearch from "./RecentSearch";
import { useRef, useEffect } from "react";
import type { Movie, Recent } from "../types/movie";
import { useVoiceSearch } from "../hooks/useVoiceSearch";

type HeaderProps = {
  movie: Movie[];
  searchMovie: string;
  setQuery: (value: string) => void;
  setSearchMovie: (value: string) => void;
  onSearch: () => void;
  recent: Recent[];
  isOpenRecent: boolean;
  showRecent: () => void;
  onDelete: (id: string) => void;
  onRecentSearch: (id: string) => void;
  setIsOpenRecent: React.Dispatch<React.SetStateAction<boolean>>
  setRecentSearch: React.Dispatch<React.SetStateAction<Recent[]>>;
  showWatchList: () => void;
};

function Header({
  movie,
  searchMovie,
  setQuery,
  onSearch,
  recent,
  isOpenRecent,
  showRecent,
  onRecentSearch,
  onDelete,
  showWatchList,
  setSearchMovie,
  setRecentSearch,
  setIsOpenRecent
}: HeaderProps): JSX.Element {
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // تنظیمات جستجوی صوتی
  const { isListening, isSupported, startListening, stopListening  } =
    useVoiceSearch({
      onResult: (text) => {
        const cleanText = text.trim();
        if (!cleanText) return; // جلوگیری از ثبت متن خالی

        setQuery(cleanText);
        setSearchMovie(text)

        const newTxt: Recent = {
          search: cleanText,
          id: crypto.randomUUID(),
        };

        setRecentSearch((prev) => {
          // جلوگیری از ثبت آیتم‌های تکراری متوالی
          if (prev.length > 0 && prev[0].search === cleanText) return prev;
          return [newTxt, ...prev];
        });
      },
      lang: "en-US",
    });

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
        
        <div onClick={showWatchList} className="flex items-center gap-3 cursor-pointer select-none shrink-0">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-xl md:text-2xl">🍿</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <h1 className="text-white text-lg md:text-2xl font-bold tracking-wide">usePopcorn</h1>
            <span className="text-[10px] md:text-xs text-gray-400">discover your next movie</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl flex items-center gap-2 md:gap-3">
          <div ref={searchContainerRef} className="relative group flex-1">
            <FiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base md:text-lg group-focus-within:text-white transition-colors duration-300" />

            <input
              onClick={showRecent}
              onKeyDown={onKeyDown}
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)} // اصلاح شده: اکنون به جای تغییر مستقیم کوئری، استیت موقت اینپوت را تغییر می‌دهد
              type="text"
              placeholder={isListening ? "Listening..." : "Search..."}
              className={`
                w-full pl-10 md:pl-12 pr-12 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-sm md:text-base text-white placeholder:text-gray-500 outline-none transition-all duration-300 backdrop-blur-md focus:bg-white/10 focus:shadow-lg
                ${isListening ? "border-red-500/50 ring-1 ring-red-500/20" : "focus:border-orange-400/50"}
              `}
            />

            {/* دکمه میکروفون جستجوی صوتی */}
            {isSupported && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300
                  ${isListening ? "text-red-500 scale-110" : "text-gray-400 hover:text-white"}
                `}
                title={isListening ? "Stop listening" : "Search by voice"}
              >
                {isListening ? (
                  <div className="relative">
                    <FiMicOff className="text-lg md:text-xl" />
                    <span className="absolute -inset-1 rounded-full bg-red-500/20 animate-ping"></span>
                  </div>
                ) : (
                  <FiMic className="text-lg md:text-xl" />
                )}
              </button>
            )}

            <div className="absolute top-full left-0 w-full mt-2 z-50">
              <RecentSearch
                setIsOpenRecent={setIsOpenRecent}
                isOpenRecent={isOpenRecent}
                onDelete={onDelete}
                onSearch={onRecentSearch}
                recent={recent}
              />
            </div>
          </div>

          <button
            onClick={() => onSearch()}
            className="h-[42px] md:h-[50px] px-4 md:px-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
          >
            <FiSearch className="text-lg" />
            <span className="hidden lg:block">Search</span>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
            Trending 🎬
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs md:text-sm text-gray-300 shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="hidden lg:inline">{movie.length} results found</span>
          <span className="lg:hidden">{movie.length}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
