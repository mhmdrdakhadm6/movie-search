import { type PropsWithChildren } from "react";
import Errors from "./Error";

type MovieBox = PropsWithChildren & {
  error: Error | null
};

function MovieBox({ children , error }: MovieBox) {
  return (
    <main className="flex-1 max-w-7xl h-full mx-auto p-6 w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {error ? <Errors /> : children}
      </div>
    </main>
  );
}

export default MovieBox;