import axios from "axios";
import type { DataMovie } from "../../types/movie";

const API_KEY: string = "ec4269a2";
  
export const fetchMovies = async (
  query: string,
  signal?: AbortSignal
): Promise<DataMovie> => {
  const response = await axios.get<DataMovie>("https://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      s: query,
    },
    signal,
  });

  return response.data;
};
