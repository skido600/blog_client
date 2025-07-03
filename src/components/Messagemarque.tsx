import Marquee from "react-fast-marquee";

const message: string =
  "⚠️ Please note: The loading process may take a moment due to usage on a free-tier hosting service.";

function MessageMarquee() {
  return (
    <div className="w-full mb-2 dark:bg-[#16404D] bg-[#1b1b1b] py-2 text-white dark:text-dark whitespace-nowrap overflow-hidden">
      <Marquee>{message}</Marquee>
    </div>
  );
}

export default MessageMarquee;
