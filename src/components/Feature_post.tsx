// import React from "react";

function Feature_post() {
  return (
    <section className="py-10">
      <main className="container mx-auto px-5 sm:px-10 md:px-16 lg:px-24">
        <h1 className="w-full inline-block font-bold capitalize text-3xl md:text-4xl lg:text-5xl text-dark dark:text-light mb-10 sm:mb-16">
          Featured Posts
        </h1>
        <aside className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          <article className="md:col-span-2 relative group rounded-xl overflow-hidden h-96 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/90 z-10 rounded-xl" />
            <img
              src="/joshua-hanson-e616t35Vbeg-unsplash.jpg"
              alt="Featured article"
              className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10 z-20 w-full">
              <span className="inline-block text-accent dark:text-accentDark/80 text-sm sm:text-base mb-2">
                Featured
              </span>
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-light">
                <span className="bg-gradient-to-r text-white from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 pb-1">
                  The Future of Web Development in 2025
                </span>
              </h2>
              <p className="text-white mt-2 text-sm sm:text-base hidden sm:block">
                Explore the latest trends and technologies that will dominate
                web development next year.
              </p>
            </div>
          </article>

          {/* Secondary Articles */}
          <div className="md:col-span-1 space-y-6">
            {[1, 2].map((item) => (
              <article
                key={item}
                className="group flex flex-col sm:flex-row md:flex-col gap-4 bg-light dark:bg-dark-foreground p-4 rounded-xl  border border-neutral-500 transition-shadow duration-300">
                <div className="overflow-hidden rounded-lg flex-shrink-0 sm:w-1/3 md:w-full h-40 sm:h-auto">
                  <img
                    src="/joshua-hanson-e616t35Vbeg-unsplash.jpg"
                    alt={`Article ${item}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-accent dark:text-accentDark">
                    {item === 1 ? "Development" : "Design"}
                  </span>
                  <h3 className="font-semibold text-base sm:text-lg md:text-xl text-dark dark:text-light mt-1">
                    The Type of Projects You Should Be Building in 2025 (With
                    Project Ideas)
                  </h3>
                  <p className="text-dark/70 dark:text-light/70 text-sm mt-2 hidden sm:block">
                    Essential project ideas to boost your portfolio and skills
                    in the coming year.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </main>
    </section>
  );
}

export default Feature_post;
