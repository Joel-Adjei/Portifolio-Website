import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
// import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import { backgrounds } from "@/assets/assets";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="projects">
          <Projects />
        </section>
        {/* <section id="blog">
          <Blog />
        </section> */}

        <section id="contact">
          <Contact />
        </section>

        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6 lg:px-[76px] text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-primary">
                Open to Opportunities
              </p>
              <h2 className="text-4xl md:text-5xl font-bold hero-text leading-tight">
                Let's Build Something{" "}
                <span className="text-primary">Remarkable</span> Together
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I bring a rare blend of engineering precision and design
                intuition to every project. Whether you need a full-stack
                developer, a UI/UX collaborator, or a creative problem-solver —
                I'm ready to make an impact on your team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="/joel-adjei-cv.pdf"
                  download="Joel_Adjei_CV.pdf"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 smooth-transition glow-effect"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11"
                    />
                  </svg>
                  Download My CV
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-primary/30 text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/5 smooth-transition"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-12 bg-background">
          <img
            src={backgrounds.bg03}
            className="absolute object-cover w-full h-full opacity-20 top-0 left-0 z-0"
            alt="bg"
          />
          <div className="container mx-auto px-6 lg:px-[76px] text-center">
            <div className="max-w-3xl mx-auto">
              <span className="text-6xl text-primary/30 font-serif leading-none select-none">
                "
              </span>
              <p className="text-lg md:text-xl font-medium text-foreground/80 italic leading-relaxed -mt-4">
                The best way to predict the future is to invent it.
              </p>
              <span className="text-6xl text-primary/30 font-serif leading-none select-none rotate-180 inline-block">
                "
              </span>
              <p className="mt-4 text-muted-foreground text-sm tracking-widest uppercase">
                — Alan Kay
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
