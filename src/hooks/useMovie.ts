import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../components/api/movieApi";
import type { DataMovie } from "../types/movie";

export function useMovie(query: string) {
    return useQuery<DataMovie , Error>({
        queryKey: ['movies' , query],
        queryFn: ({signal}) => fetchMovies(query , signal),
        retry: 3,
        enabled: !!query.trim()
    })
}