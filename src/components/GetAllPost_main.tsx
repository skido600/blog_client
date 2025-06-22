import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "./Datas/services";
import { Link } from "react-router-dom";
import { useMemo, Suspense, lazy } from "react";
import Allpost from "./helper/Allpost";
import MarkdownLoader from "./helper/MarkdownLoader";
const MarkdownRenderer = lazy(() => import("./MarkdownRenderer"));

type Post = {
  _id: string;
  title: string;
  description: string;
  HeaderImage: string;
  Imagecaption?: string;
};

function GetAllPost_main() {
  const { data, isLoading, isError } = useQuery<{ posts: Post[] }>({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
  });

  const renderedPosts = useMemo(() => {
    if (!data?.posts) return null;

    return data.posts.map((post) => (
      <>
        <div
          key={post._id}
          className="bg-white rounded-xl border dark:bg-[#1b1b1b] border-neutral-500  dark:border-neutral-800 transition-shadow overflow-hidden">
          <img
            src={post.HeaderImage}
            alt={post.Imagecaption}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 line-clamp-1">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {/* {} */}
              <Suspense fallback={<MarkdownLoader />}>
                <MarkdownRenderer content={post.description || ""} />
              </Suspense>
            </p>
            <Link
              to={`/posts/${post._id}`}
              className="inline-block text-blue-600 font-medium hover:underline">
              Read more →
            </Link>
          </div>
        </div>
      </>
    ));
  }, [data?.posts]);

  if (isLoading) return <Allpost />;
  if (isError)
    return <p className="text-center py-10">Failed to load posts.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark dark:text-light mb-8">
        Recent Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {renderedPosts}
      </div>
    </section>
  );
}

export default GetAllPost_main;
