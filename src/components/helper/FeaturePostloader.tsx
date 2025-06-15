function FeaturePostloader() {
  return (
    <aside className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {/* Main Post Skeleton */}
      <div className="md:col-span-2 relative group rounded-xl overflow-hidden h-96 md:h-auto bg-neutral-300 dark:bg-neutral-700">
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10 z-20 w-full">
          <div className="h-8 w-20 bg-neutral-400 dark:bg-neutral-600 rounded mb-2" />
          <div className="h-6 w-3/4 bg-neutral-400 dark:bg-neutral-600 rounded mb-2" />
          <div className="h-4 w-1/2 bg-neutral-400 dark:bg-neutral-600 rounded hidden sm:block" />
        </div>
      </div>

      {/* Secondary Posts Skeleton */}
      <div className="md:col-span-1 space-y-6">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="group flex flex-col mb-3 sm:flex-row md:flex-col gap-4 bg-light dark:bg-dark-foreground p-2 rounded-xl border border-neutral-500">
            <div className="overflow-hidden rounded-lg flex-shrink-0 md:w-full h-40 sm:h-auto bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-neutral-400 dark:bg-neutral-600 rounded" />
              <div className="h-4 w-3/4 bg-neutral-400 dark:bg-neutral-600 rounded" />
              <div className="h-3 w-1/2 bg-neutral-400 dark:bg-neutral-600 rounded hidden sm:block" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default FeaturePostloader;
