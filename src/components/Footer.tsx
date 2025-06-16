import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { siteMetadata } from "./Datas/sitemap";

function Footer() {
  return (
    <footer className="mt-16  rounded-2xl bg-[#1b1b1b] dark:bg-[#16404D] m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
      <h3 className="mt-16 font-medium dark:font-bold text-center text-white capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        Stories That Matter | Latest Developments | Expert Guide
      </h3>
      <p className="mt-5 px-4 text-center w-full text-white sm:w-3/5 font-light dark:font-medium text-sm sm:text-base">
        Subscribe to learn about new technology and updates. Join over 50+
        members community to stay up to date with latest news.
      </p>

      <form className="mt-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-transparent text-white pl-2 sm:pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
        />

        <input
          type="submit"
          className="bg-dark text-white text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
        />
      </form>
      <div className="flex items-center mt-8 gap-x-8">
        <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a
          href={siteMetadata.twitter}
          target="_blank"
          rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href={siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>

      <div className="w-full  mt-16 md:mt-24 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center text-white">
          &copy;{new Date().getFullYear()} Leo. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
