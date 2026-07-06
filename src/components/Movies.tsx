import type { JSX } from "react/jsx-runtime";
import MovieItem from "./MovieItem";
import Modal from "./Modal";
import Loader from "./Loader";
import type { Movie } from "../types/movie";

interface MoviesProps {
  movies: Movie[];
  isMovie: boolean;
  onClose: () => void;
  loading: boolean;
  onSelect: (id: string) => void
}

function Movies({
  movies,
  isMovie,
  onClose,
  loading,
  onSelect
}: MoviesProps): JSX.Element {
  return (
    <div className="bg-[#171717] border border-white/10 rounded-2xl p-5 flex flex-col h-full min-h-0">
      <h2 className="text-xl font-semibold mb-4 flex-shrink-0">Movies</h2>
      {!isMovie ? (
        loading ? (
          <Loader />
        ) : (
          <div className="space-y-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            {movies.map((movie) => (
              <MovieItem onSelect={onSelect} movie={movie} key={movie.imdbID} />
            ))}
          </div>
        )
      ) : (
        <Modal onClose={onClose} />
      )}
    </div>
  );
}

export default Movies;
