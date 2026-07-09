import { useVoiceSearch } from "../hooks/useVoiceSearch";
import type { Recent } from "../types/movie";

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
  setRecentSearch: React.Dispatch<React.SetStateAction<Recent[]>>;
}

function Search({ query, setQuery, setRecentSearch }: SearchProps) {
  const { isListening, isSupported, startListening, stopListening } =
    useVoiceSearch({
      onResult: (text) => {
        const cleanText = text.trim();
        if (!cleanText) return; // جلوگیری از ثبت متن خالی

        setQuery(cleanText);

        const newTxt: Recent = {
          search: cleanText,
          id: crypto.randomUUID(),
        };

        setRecentSearch((prev) => {
          // جلوگیری از ثبت آیتم‌های تکراری متوالی
          if (prev.length > 0 && prev[0].search === cleanText) return prev;
          return [newTxt, ...prev];
        });
      },
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
