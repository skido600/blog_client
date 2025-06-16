import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-dark.css";
type Props = {
  content?: string;
};

const MarkdownRenderer = ({ content }: Props) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        img: (props) => (
          <img
            {...props}
            className="inline-block rounded-full dark:text-white w-[42px] h-[42px] mr-2"
          />
        ),
        a: (props) => (
          <a
            {...props}
            className="inline-block dark:text-white hover:scale-105 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        p: ({ children }) => (
          <p className="text-base dark:text-white text-gray-700 leading-relaxed mb-4">
            {children}
          </p>
        ),
      }}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
