import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "./Datas/services";
import { Suspense, lazy } from "react";
import Idskeleton from "./helper/Idskeleton";
import MarkdownLoader from "./helper/MarkdownLoader";
const MarkdownRenderer = lazy(() => import("./MarkdownRenderer"));
function PostDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });
  if (isLoading) {
    return <Idskeleton />;
  }
  if (isError || !data.post)
    return <p className="text-center py-10">Post not found</p>;

  return (
    <section className="py-10 px-4 max-w-4xl mx-auto">
      <img
        src={data.post.HeaderImage}
        alt={data.post.Imagecaption}
        className="rounded-xl w-full mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{data.post.title}</h1>

      <article className="prose max-w-none prose-headings:mt-6 prose-pre:bg-[#1e1e1e] prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4 overflow-x-auto">
        <Suspense fallback={<MarkdownLoader />}>
          <MarkdownRenderer content={data.post.description} />
        </Suspense>
      </article>
    </section>
  );
}

export default PostDetail;
