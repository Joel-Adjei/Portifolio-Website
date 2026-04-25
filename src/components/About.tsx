import { Badge } from "@/components/ui/badge";
import { Code, Coffee, Lightbulb, Users } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import aboutImg from "@/assets/about-img.png";
import { objects } from "@/assets/assets";
import Header from "./common/Header";

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects Shipped" },
    { value: "10+", label: "Happy Clients" },
  ];

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Maintainable & scalable solutions",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring new tech",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Strong communicator & team player",
    },
    {
      icon: Coffee,
      title: "Dedication",
      description: "Committed to continuous learning",
    },
  ];

  return (
    <>
      <section
        ref={elementRef}
        className={`relative overflow-hidden section-fade-in ${isVisible ? "visible" : ""}`}
      >
        <img
          src={objects.obj3}
          className="absolute rotate-42 object-contain -right-44 -top-32 opacity-20"
        />
        <img
          src={objects.obj3}
          className="absolute rotate-42 object-contain -left-48 -bottom-28 opacity-10"
        />
        <div className="container mx-auto py-20 px-6 lg:px-[76px]">
          <div className="">
            <Header
              label={"Get to know me"}
              mainHeader={"About Me"}
              description={
                "A multi-disciplinary creator bridging the gap between aesthetics and functionality. I combine graphic design with software engineering to build digital experiences that are as beautiful as they are robust."
              }
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image column */}
            <div
              className="relative flex justify-center slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative w-full">
                <img
                  src={objects.obj1}
                  className="absolute w-[190px] md:w-[320px] rotate-42 object-contain top-2  md:right-20 md:top-5"
                />
                <img
                  src={aboutImg}
                  alt="Joel Adjei"
                  className="relative w-full object-cover "
                />
                {/* Floating stat card — glassmorphism */}
                <div
                  // className="absolute -bottom-6 -right-6 flex gap-6 px-5 py-4 rounded-2xl
                  //   bg-white/10 dark:bg-white/5
                  //   backdrop-blur-md
                  //   border border-white/30 dark:border-white/15
                  //   shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]
                  //   [transform:perspective(600px)_rotateX(4deg)_rotateY(-4deg)]
                  //   hover:[transform:perspective(600px)_rotateX(0deg)_rotateY(0deg)]
                  //   transition-transform duration-300"
                  className="absolute -bottom-6 -right-6 flex gap-6 px-5 py-4 gloss-skill-card rounded-sm
                [transform:perspective(600px)_rotateX(4deg)_rotateY(-4deg)]
                   hover:[transform:perspective(600px)_rotateX(0deg)_rotateY(0deg)]
                  transition-transform duration-300"
                  style={
                    {
                      // animationDelay: `${index * 0.1s`,
                      "--card-glow": "rgba(56,189,248,0.25)",
                      "--card-border": "rgba(56,189,248,0.4)",
                    } as React.CSSProperties
                  }
                >
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl font-bold text-primary drop-shadow-sm">
                        {s.value}
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content column */}
            <div
              className="space-y-8 slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  I am a dedicated software engineer and graphic designer who
                  thrives at the intersection of creativity and logic. With a
                  keen eye for visual storytelling and a strong foundation in
                  modern technologies, I transform complex ideas into elegant,
                  user-centric digital solutions.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My journey in tech is driven by a passion for continuous
                  learning and a commitment to excellence. Whether I'm crafting
                  a visual brand identity or architecting a scalable web
                  application, I focus on delivering impact and delighting
                  users. I believe that great software is not just functional—it
                  should be an experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Problem Solver",
                  "Creative Thinker",
                  "Team Player",
                  "Tech Enthusiast",
                  "Quick Learner",
                ].map((trait) => (
                  <Badge
                    key={trait}
                    variant="secondary"
                    className="smooth-transition hover:scale-105 px-3 py-1"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={item.title}
                    className="group flex items-start gap-3 p-4 gloss-skill-card rounded-sm
                    [transform:perspective(500px)_rotateX(3deg)_rotateY(-2deg)]
                    hover:[transform:perspective(500px)_rotateX(0deg)_rotateY(0deg)]
                    transition-all duration-300 cursor-default"
                    style={
                      {
                        animationDelay: `${0.4 + index * 0.1}s`,
                        "--card-glow": "rgba(56,189,248,0.25)",
                        "--card-border": "rgba(56,189,248,0.4)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="w-9 h-9 bg-primary/15 rounded-lg flex items-center justify-center shrink-0 shadow-inner group-hover:bg-primary/25 transition-colors duration-300">
                      <item.icon className="h-4 w-4 text-primary drop-shadow-sm" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
