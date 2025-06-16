import Marquee from "react-fast-marquee";

const stuffs = [
  "Frontend Developer & JavaScript Enthusiast 💻",
  "Built 20+ Responsive Web Projects",
  "Strong in React, Tailwind CSS & Modern UI",
  " Node.js ",
  "Currently Learning React Native",
  "Working on Backend Skills for Full-Stack Dev",
  "Actively Freelancing and Building Real-World Products",
  "Dreaming Big: Fintech Product Founder Before 25 🚀",
  "Loves Clean Code, Design, and Helping Clients Shine ✨",
];

function Marque() {
  return (
    <div className="w-full dark:bg-[#16404D]  bg-[#1b1b1b] py-2 bg-accent text-white dark:bg-accentDark text-light dark:text-dark whitespace-nowrap overflow-hidden">
      <Marquee>
        {stuffs.map((text, index) => (
          <div key={index}>
            {text} <span className="px-4">|</span>{" "}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Marque;
