function Allpost() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark dark:text-light mb-8">
        Recent Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-dark-foreground rounded-xl border border-neutral-300 dark:border-neutral-600 overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-neutral-300 dark:bg-neutral-700" />

            {/* Text skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 bg-neutral-400 dark:bg-neutral-600 rounded" />
              <div className="h-4 w-full bg-neutral-400 dark:bg-neutral-600 rounded" />
              <div className="h-4 w-5/6 bg-neutral-400 dark:bg-neutral-600 rounded" />
              <div className="h-4 w-1/2 bg-neutral-400 dark:bg-neutral-600 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Allpost;
