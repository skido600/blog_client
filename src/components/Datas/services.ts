import type { FeaturedPostResponse } from "../types";

const fetchFeaturedPosts = async (): Promise<FeaturedPostResponse> => {
  const res = await fetch(
    "https://my-blog-z9ga.onrender.com/all/post/featured"
  );
  if (!res.ok) throw new Error("Failed to fetch featured posts");
  return res.json();
};
const fetchPostById = async (id: string | undefined) => {
  const res = await fetch(`https://my-blog-z9ga.onrender.com/all/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};
async function fetchAllPosts() {
  const res = await fetch("https://my-blog-z9ga.onrender.com/all/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export { fetchFeaturedPosts, fetchPostById, fetchAllPosts };
