import type { JSX } from "react/jsx-runtime";
import type { Movie } from "../types/movie";

type MovieItemProps = {
  movie: Movie;
  onSelect: (id: string) => void;
};

function MovieItem({ movie, onSelect }: MovieItemProps): JSX.Element {
  return (
    <div
      onClick={() => onSelect(movie.imdbID)}
      className="
        flex items-center gap-4 p-3 rounded-xl
        hover:bg-white/5
        cursor-pointer
        transition-all duration-300
        border border-transparent
        hover:border-white/10
      "
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-14 h-20 object-cover rounded-lg shadow-md"
      />

      <div>
        <h3 className="text-white font-medium">{movie.Title}</h3>
        <p className="text-gray-400 text-sm">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieItem;
