import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const siteMetadata = {
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourprofile",
  github: "https://github.com/yourprofile",
};

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

interface NavLink {
  label: string;
  to: string;
}

interface MobileNavProps {
  toggle: () => void;
  navLinks: NavLink[];
  click: boolean;
}

const Nav = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();

  const toggle = () => {
    setClick(!click);
  };

  return (
    <div className="relative">
      {/* Add padding-top to the main content to account for fixed navbar */}
      <div className="pt-16 sm:pt-20">
        {/* Your page content would go here */}
      </div>

      <header className="fixed top-0 left-0 right-0 px-3 md:px-24 z-50 bg-white/80 backdrop-blur-md m-auto p-4 flex items-center justify-between shadow-sm">
        <section className="flex items-center">
          <div className="font-bold text-lg">Logo</div>

          {/* Desktop Nav */}
          <nav className="w-max py-3 px-8 rounded-full font-medium capitalize items-center hidden sm:flex z-50">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className={`mx-2 px-4 rounded-2xl hover:border-b hover:bg-[#5043e7] hover:text-white ${
                  location.pathname === link.to ? "bg-[#5043e7] text-white" : ""
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </section>

        {/* Social Icons */}
        <div className="hidden sm:flex items-center">
          <a
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-block w-6 h-6 mr-4">
            <FaLinkedin className="hover:scale-125 transition-all ease duration-200" />
          </a>
          <a
            href={siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="inline-block w-6 h-6 mr-4">
            <FaTwitter className="hover:scale-125 transition-all ease duration-200" />
          </a>
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-block w-6 h-6 mr-4">
            <FaGithub className="hover:scale-125 transition-all ease duration-200" />
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          className="inline-block sm:hidden pr-4"
          onClick={toggle}
          aria-label="Hamburger Menu">
          <div className="w-6 cursor-pointer transition-all ease duration-300">
            <div className="relative h-6">
              <span
                className="absolute top-0 w-full h-0.5 bg-black rounded transition-all ease duration-200"
                style={{
                  transform: click
                    ? "rotate(-45deg) translateY(12px)"
                    : "rotate(0deg) translateY(0px)",
                }}
              />
              <span
                className="absolute top-2 w-full h-0.5 bg-black rounded transition-all ease duration-200"
                style={{
                  opacity: click ? 0 : 1,
                }}
              />
              <span
                className="absolute top-4 w-full h-0.5 bg-black rounded transition-all ease duration-200"
                style={{
                  transform: click
                    ? "rotate(45deg) translateY(-11px)"
                    : "rotate(0deg) translateY(0px)",
                }}
              />
            </div>
          </div>
        </button>
      </header>

      {/* Mobile Nav Component */}
      <MobileNav click={click} navLinks={navLinks} toggle={toggle} />
    </div>
  );
};

export default Nav;

const MobileNav = ({ click, navLinks, toggle }: MobileNavProps) => {
  const location = useLocation();

  return (
    <nav
      className={`w-max py-3 z-50 px-6 sm:px-8 border border-black rounded-full font-medium capitalize items-center flex md:hidden fixed right-1/2 translate-x-1/2 bg-white/80 backdrop-blur-sm transition-all ease duration-300 ${
        click ? "top-3" : "-top-20"
      }`}>
      {navLinks.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          onClick={toggle}
          className={`mx-2 ${
            location.pathname === link.to
              ? "border-[#5043e7] border-b text-black px-4  rounded-b-2xl"
              : ""
          }`}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
