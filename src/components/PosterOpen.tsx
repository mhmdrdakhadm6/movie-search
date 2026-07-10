import type { DetailMovies } from "../types/movie";
import { X } from "lucide-react";

interface Poster {
  watch: DetailMovies;
  setIsPosterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPosterOpen: boolean;
}

function PosterOpen({ watch, setIsPosterOpen, isPosterOpen }: Poster) {
  if (!isPosterOpen) return null;
  return (
    <div
      onClick={() => setIsPosterOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center justify-center w-full h-full"
      >
        <button
          onClick={() => setIsPosterOpen(false)}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 border-2 border-white/20 hover:border-white/40 text-white transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Close poster"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={watch.Poster}
          alt={watch.Title}
          className="max-h-[85vh] max-w-[95vw] sm:max-h-[90vh] sm:max-w-[90vw] rounded-2xl shadow-2xl object-contain"
        />
      </div>
    </div>
  );
}

export default PosterOpen;
