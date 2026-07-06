import axios from "axios";

const API_KEY: string = "ec4269a2";

export const fetchDetailMovie = async (
  selectedId: string,
  signal: AbortSignal
) => {
  const res = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      i: selectedId,
    },
    signal,
  });
  
  return res.data;
};
