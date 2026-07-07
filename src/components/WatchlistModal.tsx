import { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2, FiFilm, FiCheck } from "react-icons/fi";
import type { Movie } from "../types/movie";

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Movie[];
  onRemove: (id: string) => void;
  onAdd?: () => void;
}

function WatchlistModal({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onAdd,
}: WatchlistModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // ذخیره لیست فیلم‌های تماشا شده در LocalStorage
  const [watchedIds, setWatchedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("watched_movies");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // سینک کردن لوکال استوریج با تغییر استیت
  useEffect(() => {
    localStorage.setItem("watched_movies", JSON.stringify(watchedIds));
  }, [watchedIds]);

  // انیمیشن باز و بسته شدن مودال
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const toggleWatched = (id: string) => {
    setWatchedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredWatchlist = watchlist.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-300 ease-out
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`
          fixed z-50 
          bottom-0 left-0 right-0
          sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
          w-full h-[80vh] sm:h-[85vh] sm:max-w-2xl lg:max-w-3xl
          bg-[#121212] 
          rounded-t-3xl sm:rounded-3xl
          shadow-2xl
          transition-all duration-300 ease-out
          flex flex-col
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 sm:scale-95"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-white/5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10">
                <FiFilm className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">My Watchlist</h2>
                <p className="text-xs text-gray-400">
                  {watchlist.length}{" "}
                  {watchlist.length === 1 ? "movie" : "movies"} saved
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                w-10 h-10 rounded-xl
                bg-white/5 hover:bg-white/10
                flex items-center justify-center
                text-gray-400 hover:text-white
                transition-all duration-200
                active:scale-95
              "
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search in watchlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full px-4 py-2.5 pl-10
                  bg-white/5 border border-white/10
                  rounded-xl
                  text-sm text-white placeholder:text-gray-500
                  focus:outline-none focus:border-orange-500/50
                  transition-all duration-200
                "
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 3v6h6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
          {filteredWatchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-6 rounded-full bg-white/5 mb-4">
                <FiFilm className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300">
                {searchTerm ? "No results found" : "Your watchlist is empty"}
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                {searchTerm
                  ? `No movies matching "${searchTerm}"`
                  : "Start adding movies you want to watch later"}
              </p>
              {!searchTerm && onAdd && (
                <button
                  onClick={onAdd}
                  className="
                    mt-6 px-6 py-3
                    bg-orange-500 hover:bg-orange-600
                    text-black font-bold
                    rounded-xl
                    flex items-center gap-2
                    transition-all duration-200
                    active:scale-95
                  "
                >
                  <FiPlus className="w-5 h-5" />
                  Browse Movies
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredWatchlist.map((movie) => {
                const isWatched = watchedIds.includes(movie.imdbID);
                return (
                  <div
                    key={movie.imdbID}
                    className={`
                      group relative
                      p-3
                      bg-white/5 hover:bg-white/10
                      border border-white/5 hover:border-orange-500/30
                      rounded-2xl
                      transition-all duration-300
                      flex gap-3
                      ${isWatched ? "opacity-40 grayscale-[50%]" : ""}
                    `}
                  >
                    {/* Poster */}
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="
                        w-16 h-24 rounded-lg object-cover shrink-0
                        shadow-lg
                      "
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h3 className={`text-sm font-semibold text-white truncate ${isWatched ? "line-through text-gray-500" : ""}`}>
                          {movie.Title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            {movie.Year}
                          </span>
                        </div>
                      </div>

                      {/* دکمه علامت‌گذاری به عنوان تماشا شده */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => toggleWatched(movie.imdbID)}
                          className={`
                            flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] md:text-xs font-medium transition-all duration-200
                            ${isWatched 
                              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                              : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          <FiCheck className={`w-3.5 h-3.5 ${isWatched ? "stroke-[3px]" : ""}`} />
                          {isWatched ? "Watched" : "Mark watched"}
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemove(movie.imdbID)}
                      className="
                        absolute top-2 right-2
                        opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                        transition-all duration-200
                        p-2 sm:p-1.5 rounded-lg
                        bg-red-500/20 hover:bg-red-500/40
                        text-red-400 hover:text-red-300
                        active:scale-90
                      "
                    >
                      <FiTrash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {filteredWatchlist.length} of {watchlist.length} movies
            </span>
            <button
              onClick={onClose}
              className="
                px-4 py-2
                bg-white/5 hover:bg-white/10
                rounded-lg
                text-white
                transition-all duration-200
                active:scale-95
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WatchlistModal;
