const BookInfoSkeleton = () => (
  <div className="relative min-h-screen w-full overflow-hidden">
    <div className="relative z-10 w-full mx-auto pt-20 lg:pt-24 pb-14 px-4 md:px-14">
      {/* button */}
      <div className="h-8 w-20 bg-zinc-700/60 rounded animate-pulse mb-3" />

      <div className="flex flex-col items-center mt-8 gap-8 md:gap-15">
        {/* title */}
        <div className="w-full flex justify-center">
          <div className="h-8 md:h-10 bg-zinc-700/60 rounded animate-pulse w-2/3" />
        </div>

        <div className="w-full flex flex-col gap-8 lg:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start md:flex-row md:gap-18">
            {/* image */}
            <div className="w-60 md:w-full md:max-w-xs aspect-3/4 rounded-lg bg-zinc-700/60 animate-pulse" />

            {/* info */}
            <div className="flex flex-col gap-5 pt-8 md:pt-0 w-full max-w-sm">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-20 bg-zinc-600/60 rounded animate-pulse" />
                <div className="h-6 w-40 bg-zinc-700/60 rounded animate-pulse" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-12 bg-zinc-600/60 rounded animate-pulse" />
                <div className="h-7 w-28 bg-zinc-700/60 rounded animate-pulse" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-20 bg-zinc-600/60 rounded animate-pulse" />
                <div className="h-6 w-32 bg-zinc-700/60 rounded animate-pulse" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-20 bg-zinc-600/60 rounded animate-pulse" />
                <div className="h-3 bg-zinc-700/50 rounded animate-pulse w-full" />
                <div className="h-3 bg-zinc-700/50 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-zinc-700/50 rounded animate-pulse w-4/6" />
              </div>
              <div className="h-10 w-36 bg-zinc-700/60 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BookInfoSkeleton;
