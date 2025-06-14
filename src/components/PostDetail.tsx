import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "./Datas/services";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // <-- dark theme for code blocks
import rehypeRaw from "rehype-raw";
function PostDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center py-10">Loading post...</p>;
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
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            img: (props) => (
              <img
                {...props}
                className="inline-block rounded-full w-[42px] h-[42px] mr-2"
              />
            ),
            a: (props) => (
              <a
                {...props}
                className="inline-block hover:scale-105 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            p: ({ children }) => (
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {children}
              </p>
            ),
          }}>
          {data.post.description}
        </ReactMarkdown>
      </article>
    </section>
  );
}

export default PostDetail;
