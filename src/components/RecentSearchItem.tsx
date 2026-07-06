import { FiTrash2 } from "react-icons/fi";
import type { Recent } from "../types/movie";

interface IRecent {
  recent: Recent;
  onSearch: (id: string) => void;
  onDelete: (id: string) => void;
}

function RecentSearchItem({
  recent,
  onSearch,
  onDelete,
}: IRecent) {
  return (
    <li
      className="
        group
        px-4
        py-3
        flex
        items-center
        justify-between
        gap-3
        cursor-pointer
        hover:bg-white/5
        transition-colors
      "
    >
      {/* Left Side */}
      <div
        onClick={() => onSearch(recent.id)}
        className="flex items-center gap-3 flex-1 min-w-0"
      >
        <svg
          className="w-4 h-4 text-gray-500 shrink-0"
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

        <span className="text-sm text-gray-200 truncate">
          {recent.search}
        </span>
      </div>

      {/* Delete Button - Always visible on mobile, hover on desktop */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(recent.id);
        }}
        className="
          opacity-100
          sm:opacity-0
          sm:group-hover:opacity-100
          transition-all
          duration-200
          shrink-0
          w-8
          h-8
          rounded-lg
          flex
          items-center
          justify-center
          text-gray-400
          hover:text-red-400
          hover:bg-red-500/10
        "
      >
        <FiTrash2 className="text-sm" />
      </button>
    </li>
  );
}

export default RecentSearchItem;