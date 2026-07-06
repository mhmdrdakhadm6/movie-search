import { useVoiceSearch } from "../hooks/useVoiceSearch";

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  const { isListening, isSupported, startListening, stopListening } =
    useVoiceSearch({
      onResult: (text) => setQuery(text),
      lang: "en-US", // چون اسم فیلم‌ها معمولاً انگلیسی‌اند
    });

  return (
    <div className="relative flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full rounded-xl bg-zinc-900 border border-white/10 px-4 py-3 text-white outline-none"
      />

      {isSupported && (
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={`rounded-xl px-3 py-3 transition ${
            isListening
              ? "bg-red-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {isListening ? "Stop" : "🎤"}
        </button>
      )}
    </div>
  );
}

export default Search;
