import AboutCoverSection from "../components/AboutCoverSection";

import Marque from "../components/Marque";
import Me from "../components/Me";
import Skills from "../components/Skills";

function About() {
  return (
    <>
      <Marque />
      <AboutCoverSection />;
      <Skills />
      <Me />
    </>
  );
}

export default About;
