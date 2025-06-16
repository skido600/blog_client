const AboutCoverSection = () => {
  return (
    <section className="w-full md:h-[75vh] border-b-2 border-dark dark:border-neutral-800 flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      {/* Image Side */}
      <div className="w-full md:w-1/2 h-full border-r-2 border-dark dark:border-neutral-800 flex justify-center">
        <img
          src="/character-removebg-preview.png"
          alt="Treasure Uzoma"
          className="w-4/5 xs:w-3/4 md:w-full h-full object-contain object-center"
        />
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left">
          Creative Developer, 💻
        </h2>
        <p className="font-medium capitalize mt-4 text-base">
          As a dedicated freelancer, I craft meaningful digital experiences by
          blending modern technology with clean, timeless design. Inspired by
          creativity, nature, and lifelong learning, I embrace every challenge
          as a chance to grow. With each project, my goal is to create work that
          resonates—leaving a lasting impression, one pixel at a time.
        </p>
      </div>
    </section>
  );
};

export default AboutCoverSection;
