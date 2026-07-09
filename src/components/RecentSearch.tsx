import { useEffect } from "react";
import type { Recent } from "../types/movie";
import RecentSearchItem from "./RecentSearchItem";

interface IRecent {
  recent: Recent[];
  onDelete: (id: string) => void;
  isOpenRecent: boolean;
  onSearch: (id: string) => void;
  setIsOpenRecent: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecentSearch({
  recent,
  onSearch,
  onDelete,
  isOpenRecent,
  setIsOpenRecent,
}: IRecent) {
  const hadleCloseRecentSearch = (): void => {
    setIsOpenRecent(false);
  };

  useEffect(() => {
    if (!isOpenRecent) return;
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        hadleCloseRecentSearch();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hadleCloseRecentSearch , isOpenRecent]);

  if (!isOpenRecent || recent.length === 0) return null;
  return (
    <div
      className="
        absolute 
        top-[calc(100%+8px)] 
        left-0 
        w-full 
        rounded-2xl 
        border 
        border-white/10 
        bg-zinc-900/95 
        shadow-2xl 
        backdrop-blur-md 
        overflow-hidden 
        z-50
      "
    >
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
          Recent searches
        </p>
      </div>

      <ul
        className="
          max-h-60 
          overflow-y-auto 
          py-2
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-white/10
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-white/20
        "
      >
        {recent.map((item) => (
          <RecentSearchItem
            onDelete={onDelete}
            onSearch={onSearch}
            key={item.id}
            recent={item}
          />
        ))}
      </ul>
    </div>
  );
}

export default RecentSearch;
