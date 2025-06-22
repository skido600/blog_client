import { useQuery } from "@tanstack/react-query";
import type { FeaturedPostResponse } from "../components/types";
import { fetchFeaturedPosts } from "./Datas/services";
import { Link } from "react-router-dom";
import FeaturePostloader from "./helper/FeaturePostloader";

function Feature_post() {
  const { data, isLoading, isError } = useQuery<FeaturedPostResponse>({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
  });

  const hasNoPosts = !data?.posts?.length;
  const mainPost = data?.posts?.[0];
  const secondaryPosts = data?.posts?.slice(1, 3) || [];

  return (
    <section className="py-10">
      <main className="container mx-auto px-5 sm:px-10 md:px-16 lg:px-24">
        {/* Always visible */}
        <h1 className="w-full inline-block font-bold capitalize text-xl md:text-4xl lg:text-5xl text-dark dark:text-light mb-10 sm:mb-16">
          Featured Posts
        </h1>

        {/* Loading */}
        {isLoading && <FeaturePostloader />}

        {/* Error or No Posts */}
        {(isError || hasNoPosts) && !isLoading && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No Featured Posts
          </div>
        )}

        {/* Show posts */}
        {!isLoading && !isError && !hasNoPosts && mainPost && (
          <aside className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Post */}
            <Link
              to={`/post/${mainPost._id}`}
              className="md:col-span-2 relative  dark:border-neutral-800  group rounded-xl overflow-hidden h-96 md:h-auto block">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/90 z-10 rounded-xl" />
              <img
                src={mainPost.HeaderImage}
                alt={mainPost.title}
                className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10 z-20 w-full">
                <span className="inline-block text-accent dark:text-accentDark/80 text-sm sm:text-base mb-2">
                  Featured
                </span>
                <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-light">
                  <span className="bg-gradient-to-r text-white from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 pb-1">
                    {mainPost.title}
                  </span>
                </h2>
                <p className="text-white mt-2 text-sm sm:text-base hidden sm:block">
                  {mainPost.Imagecaption}
                </p>
              </div>
            </Link>

            {/* Secondary Posts */}
            <div className="md:col-span-1 space-y-6">
              {secondaryPosts.map((item) => (
                <Link to={`/posts/${item._id}`} key={item._id}>
                  <article className="group flex flex-col  mb-3 sm:flex-row md:flex-col gap-4 bg-light dark:bg-dark-foreground  dark:border-neutral-800  p-2 rounded-xl border border-neutral-500 transition-shadow duration-300">
                    <div className="overflow-hidden rounded-lg flex-shrink-0  md:w-full h-40 sm:h-auto">
                      <img
                        src={item.HeaderImage}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium text-accent dark:text-accentDark">
                        Featured
                      </span>
                      <h3 className="font-semibold text-base sm:text-lg md:text-xl text-dark dark:text-light mt-1">
                        {item.title}
                      </h3>
                      <p className="text-dark/70 dark:text-light/70 text-sm mt-2 hidden sm:block">
                        {item.Imagecaption}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </main>
    </section>
  );
}

export default Feature_post;
