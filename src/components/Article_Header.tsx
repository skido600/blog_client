// import React from "react";

function Article_Header() {
  return (
    <section className="w-full inline-block">
      <article className="group flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh] overflow-hidden rounded-3xl">
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/90 z-10 rounded-3xl" />

        {/* Background image */}
        <img
          src="/joshua-hanson-e616t35Vbeg-unsplash.jpg"
          alt="image_article"
          className="w-full h-full object-center object-cover rounded-3xl absolute z-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        {/* Text content */}
        <div className="relative w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-20 text-white transition-all duration-300   rounded-2xl">
          <a
            href="#"
            className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Tag Name
          </a>
          <h1 className="mt-6 font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              Article Title Goes Here
            </span>
          </h1>
          <p className="hidden sm:inline-block mt-4 md:text-lg lg:text-xl">
            This is a short description of the article, styled similarly to the
            original design.
          </p>
        </div>
      </article>
    </section>
  );
}

export default Article_Header;
