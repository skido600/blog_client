import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "./Datas/services";
import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
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

  const post = data.post;

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description?.slice(0, 40)} />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description?.slice(0, 150)}
        />
        <meta property="og:image" content={post.HeaderImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.description?.slice(0, 150)}
        />
        <meta name="twitter:image" content={post.HeaderImage} />
      </Helmet>

      <section className="py-10 px-4 max-w-4xl mx-auto">
        <img
          src={post.HeaderImage}
          alt={post.Imagecaption}
          className="rounded-xl w-full mb-6"
        />
        <p className="mb-4 text-[#364153] text-sm">{post.views} viewers</p>
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          {post.title}
        </h1>

        <article className="prose max-w-none dark:text-white prose-headings:mt-6 prose-pre:bg-[#1e1e1e] prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4 overflow-x-auto">
          <Suspense fallback={<MarkdownLoader />}>
            <MarkdownRenderer content={post.description} />
          </Suspense>
        </article>
      </section>
    </>
  );
}

export default PostDetail;
