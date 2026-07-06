export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface DataMovie {
  Response: string;
  Search: Movie[];
  Error?: string;
}

export interface Recent {
  search: string;
  id: string;
}

export interface DetailMovies {
  Poster: string;
  Title: string;
  imdbRating?: string;
  Plot?: string;
  Actors: string;
  Genre: string;
  Country: string;
  Released: string;
  Runtime: string;
}
