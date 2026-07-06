import type { DetailMovies } from "../types/movie";

interface DetailItemProps {
  watch: DetailMovies;
  onAdd: () => void;
}

function DetailItem({ watch, onAdd }: DetailItemProps) {
  return (
    <div className="relative text-white rounded-3xl overflow-y-auto overflow-x-hidden bg-[#121212] border border-white/5 shadow-2xl h-full flex flex-col custom-scrollbar">
      {/* بخش هدر سینماتیک با افکت بلر و بک‌دراپ پوستر فیلم */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-20"
          style={{ backgroundImage: `url(${watch.Poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
        
        {/* موقعیت‌یابی پوستر اصلی روی هدر - رفع باگ translate-y */}
        <div className="absolute bottom-0 left-6 md:left-8 flex gap-6 items-end z-10">
          <img
            src={watch.Poster}
            alt={watch.Title}
            className="w-36 md:w-44 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.8)] border-2 border-white/10 object-cover aspect-[2/3]"
          />
          <div className="hidden sm:flex flex-col gap-2 mb-6">
            <span className="text-sm font-semibold tracking-wider text-orange-500 uppercase">
              {watch.Genre.split(",")[0]}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md">
              {watch.Title}
            </h2>
          </div>
        </div>
      </div>

      {/* بخش محتوای متنی و جزییات */}
      <div className="pt-12 md:pt-16 px-6 md:px-8 pb-8 flex-1 flex flex-col gap-6">
        
        {/* تایتل برای حالت موبایل (زمانی که تایتل بالا در سایز کوچک پنهان است) */}
        <div className="block sm:hidden">
          <span className="text-xs font-semibold tracking-wider text-orange-500 uppercase">
            {watch.Genre.split(",")[0]}
          </span>
          <h2 className="text-2xl font-extrabold mt-1">{watch.Title}</h2>
        </div>

        {/* بج‌های اطلاعاتی شیشه‌ای (Glassmorphism Metadata) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <span className="text-yellow-400">★</span>
            <span className="text-white font-bold">{watch.imdbRating}</span>
            <span className="text-gray-500">/10</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            {watch.Runtime}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            {watch.Released}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
            {watch.Country.split(",")[0]}
          </div>
        </div>

        {/* خط جداکننده */}
        <hr className="border-white/5" />

        {/* خلاصه داستان */}
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Storyline</h3>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
            {watch.Plot !== "N/A" ? watch.Plot : "No description available for this title."}
          </p>
        </div>

        {/* بخش جزییات گرید (بازیگران و اطلاعات دیگر) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Starring</span>
            <span className="text-sm text-gray-300 font-medium leading-relaxed">{watch.Actors}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Genres & Details</span>
            <span className="text-sm text-gray-300 font-medium leading-relaxed">{watch.Genre}</span>
          </div>
        </div>

        {/* دکمه‌های عملیاتی در پایین صفحه */}
        <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onAdd}
            className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-black font-bold rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add to Watchlist
          </button>
          
          <button className="px-6 py-4 bg-white/5 hover:bg-white/10 active:scale-95 text-white font-semibold rounded-2xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
            </svg>
            Trailer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailItem;