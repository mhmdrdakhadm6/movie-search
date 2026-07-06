import type { JSX } from "react/jsx-runtime";
import { FiFilm } from "react-icons/fi";

type EmptyProps = {
  title?: string;
  description?: string;
};

function Empty({
  title = "No movie selected",
  description = "Search and select a movie to see details.",
}: EmptyProps): JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-4 text-gray-400">

        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <FiFilm className="text-2xl" />
        </div>

        <div className="space-y-1">
          <h2 className="text-white text-lg font-semibold">
            {title}
          </h2>

          <p className="text-sm text-gray-500 max-w-xs">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Empty;
