const BookCardSkeleton = () => {
  return (
    <div className="w-28 md:w-40 lg:w-52 bg-gray-900/60 rounded-2xl p-4 pt-0 border border-white/5">
      {/* zurag skeleton */}
      <div className="relative -mt-8 mb-4 mx-auto w-20 md:w-30 lg:w-40 aspect-[151/223] rounded-lg bg-zinc-700/60 animate-pulse" />

      <div className="space-y-2 px-1">
        {/* title skeleton */}
        <div className="h-3 md:h-4 bg-zinc-700/60 rounded animate-pulse w-full" />
        {/* author skeleton */}
        <div className="h-2 md:h-3 bg-zinc-700/40 rounded animate-pulse w-3/4 pb-2" />
      </div>

      {/* button skeleton */}
      <div className="w-full h-6 md:h-11 bg-zinc-800/60 rounded-2xl animate-pulse mt-2" />
    </div>
  );
};

export default BookCardSkeleton;
