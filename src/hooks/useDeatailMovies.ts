import { useQuery } from "@tanstack/react-query";
import { fetchDetailMovie } from "../components/api/DetailMovieApi";

export const useDetailMovies = (selectedId: string) => {
  return useQuery({
    queryKey: ["selectedId", selectedId],
    queryFn: ({ signal }) => fetchDetailMovie(selectedId, signal),
    retry: 3,
    enabled: !!selectedId.trim(),
  });
};
