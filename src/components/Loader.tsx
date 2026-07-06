function Loader() {
  return (
    <div className="flex-1 min-h-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">

        {/* Glow Background */}
        <div className="relative flex items-center justify-center">

          {/* Soft Glow */}
          <div className="absolute w-24 h-24 rounded-full bg-white/5 blur-2xl animate-pulse" />

          {/* Outer Ring */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border border-white/10" />

            {/* Animated Spinner */}
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-400 border-r-red-500 animate-spin" />

            {/* Inner Circle */}
            <div className="absolute inset-3 rounded-full bg-[#171717] border border-white/5 flex items-center justify-center">
              <span className="text-2xl animate-pulse">
                🍿
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-lg tracking-wide font-medium">
            Loading movies...
          </p>

          <span className="text-sm text-gray-500 animate-pulse">
            fetching cinematic experience
          </span>
        </div>

      </div>
    </div>
  );
}

export default Loader;
