import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts } from "./Datas/services";
import { Link } from "react-router-dom";
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

  if (isLoading) return <p className="text-center py-10">Loading posts...</p>;
  if (isError)
    return <p className="text-center py-10">Failed to load posts.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-xl border border-neutral-500transition-shadow overflow-hidden">
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
              {post.description}
            </p>
            <Link
              to={`/post/${post._id}`}
              className="inline-block text-blue-600 font-medium hover:underline">
              Read more →
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

export default GetAllPost_main;
