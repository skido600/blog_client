import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type ArticleImage = {
  url: string;
  _id: string;
};

type Post = {
  _id: string;
  title: string;
  description: string;
  Imagecaption: string;
  HeaderImage: string;
  articleImages: ArticleImage[];
  views: number;
  createdAt: string;
};

const token = localStorage.getItem("token");

const AllPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://my-blog-z9ga.onrender.com/all/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `https://my-blog-z9ga.onrender.com/admin/create/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        toast.success(data.message || "Post deleted successfully", {
          style: {
            backgroundColor: "#38A169",
            color: "white",
          },
        });
      } else {
        toast.error(data.message || "Failed to delete post", {
          style: {
            backgroundColor: "#E53E3E",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong!", {
        style: {
          backgroundColor: "#E53E3E",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 ">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No post found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg border border-neutral-400 mb-6 overflow-hidden">
            <img
              src={post.HeaderImage}
              alt="Header"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {post.description}
              </p>
              <p className="italic text-sm text-gray-500 mt-1">
                📸 {post.Imagecaption}
              </p>
              <p className="text-sm text-gray-500">👁 {post.views} views</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
              {post.articleImages?.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {post.articleImages.map((img) => (
                    <img
                      key={img._id}
                      src={img.url}
                      alt="Article"
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllPost;
