import { useQuery } from "@tanstack/react-query";
import { fetchByView } from "./Datas/services";
import { Link } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";

type Post = {
  _id: string;
  title: string;
  description: string;
  HeaderImage: string;
  Imagecaption?: string;
};

function Article_Header() {
  const { data, isLoading, isError } = useQuery<{ post: Post }>({
    queryKey: ["view"],
    queryFn: fetchByView,
  });

  if (isError) return <p className="text-center">Something went wrong</p>;
  console.log(data);
  const firstPost = data?.post;

  return (
    <section className="w-full inline-block">
      <article className="group flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh] overflow-hidden rounded-3xl">
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-black/90 z-10 rounded-3xl" />

        {/* Background image or skeleton */}
        {isLoading ? (
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse absolute z-0 rounded-3xl" />
        ) : (
          <img
            src={firstPost?.HeaderImage}
            alt="image_article"
            className="w-full h-full object-center object-cover rounded-3xl absolute z-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        )}

        {/* Text content or skeleton */}
        <div className="relative w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-20 text-white transition-all duration-300 rounded-2xl">
          {isLoading ? (
            <>
              <div className="w-20 h-6 bg-white/30 rounded-full animate-pulse" />
              <div className="w-3/4 h-8 sm:h-10 md:h-12 bg-white/30 rounded-md mt-6 animate-pulse" />
              <div className="hidden sm:block mt-4 w-full h-6 md:h-7 bg-white/20 rounded-md animate-pulse" />
            </>
          ) : (
            <>
              <Link
                to={`/post/${firstPost?._id}`}
                className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {" "}
                Tag Name
              </Link>
              <h1 className="mt-6 font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
                <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                  {firstPost?.title}
                </span>
              </h1>
              <p className="hidden sm:inline-block mt-4 md:text-lg lg:text-xl">
                {/* {} */}
                <MarkdownRenderer content={firstPost?.description || ""} />
              </p>
            </>
          )}
        </div>
      </article>
    </section>
  );
}

export default Article_Header;
