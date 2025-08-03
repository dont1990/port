import { Suspense } from "react";
import Hero from "./hero";
import About from "./about";
import Skills from "./skills";
import Contact from "./contact";
import Projects from "./projects";
import Experience from "./experience";
import HeroSkeleton from "./hero/skeleton";
import AboutSkeleton from "./about/skeleton";
import SkillsSkeleton from "./skills/skeleton";
import ContactSkeleton from "./contact/skeleton";
import ProjectsSkeleton from "./projects/skeleton";
import ExperienceSkeleton from "./experience/skeleton";

const HomePageContent = async () => {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <About />
      </Suspense>
      <Suspense fallback={<SkillsSkeleton />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<ExperienceSkeleton />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePageContent;
