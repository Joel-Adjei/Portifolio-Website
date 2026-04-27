import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ProjectCard from "@/components/ui/ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Header from "./common/Header";
import { projects as projectImages, backgrounds } from "@/assets/assets";

const Projects = () => {
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const projects = [
    {
      id: 1,
      title: "NexGen E-Commerce",
      description:
        "A premium full-stack shopping experience with real-time inventory, secure Stripe payments, and a sleek glassmorphic dashboard.",
      image: projectImages.project1,
      tech: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
      github: "#",
      live: "#",
      featured: true,
      category: "development",
    },
    {
      id: 2,
      title: "Lumina Brand Identity",
      description:
        "Comprehensive branding project for a tech startup, including logo design, typography systems, and high-fidelity marketing assets.",
      image: projectImages.project2,
      tech: ["Illustrator", "Photoshop", "Figma"],
      github: "#",
      live: "#",
      category: "design",
    },
    {
      id: 3,
      title: "Vivid UI Design System",
      description:
        "A meticulously crafted design system with over 500+ components, ensuring consistency across web and mobile platforms.",
      image: projectImages.project3,
      tech: ["Figma", "Design Tokens", "React"],
      github: "#",
      live: "#",
      category: "design",
    },
    {
      id: 4,
      title: "Flow Task Manager",
      description:
        "A collaborative productivity tool featuring real-time drag-and-drop boards, team analytics, and smart notifications.",
      image: projectImages.project4,
      tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      github: "#",
      live: "#",
      category: "development",
    },
    {
      id: 5,
      title: "Skyline Real Estate",
      description:
        "Interactive property listing platform with 3D walkthroughs, map integration, and advanced filtering capabilities.",
      image: projectImages.project5,
      tech: ["Vue.js", "Three.js", "Mapbox", "Firebase"],
      github: "#",
      live: "#",
      category: "development",
    },
  ];

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api || isPaused) return;
    const timer = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 4000);
    return () => clearInterval(timer);
  }, [api, isPaused]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section
      ref={elementRef}
      className={`relative py-24 section-fade-in ${isVisible ? "visible" : ""}  bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-6 lg:px-[76px] z-10">
        <div className="mb-16">
          <Header
            label="Portfolio"
            mainHeader="Featured Projects"
            description="A curated showcase of my technical expertise and creative vision, bridging the gap between design and development."
          />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background/80 via-background/20 to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background/80 via-background/20 to-transparent z-10 pointer-events-none hidden md:block" />

          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "center",
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8 items-center py-12">
              {projects.map((project, index) => {
                const isActive = index === current;
                return (
                  <CarouselItem
                    key={project.id}
                    className="pl-4 md:pl-8 basis-full sm:basis-[85%] md:basis-[65%] lg:basis-[50%] transition-all duration-700 ease-out"
                    style={{
                      transform: isActive ? "scale(1.05)" : "scale(0.9)",
                      opacity: isActive ? 1 : 0.3,
                      zIndex: isActive ? 20 : 10,
                      filter: isActive ? "none" : "blur(2px)",
                    }}
                  >
                    <div className="p-2">
                      <ProjectCard project={project} index={index} />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Navigation Controls */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full flex items-center justify-center smooth-transition
              bg-background/80 border border-primary/20 backdrop-blur-xl text-primary
              hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-2xl hidden md:flex"
            aria-label="Previous Project"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full flex items-center justify-center smooth-transition
              bg-background/80 border border-primary/20 backdrop-blur-xl text-primary
              hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-2xl hidden md:flex"
            aria-label="Next Project"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Mobile Controls */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 rounded-full smooth-transition ${
                i === current
                  ? "w-10 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]"
                  : "w-2.5 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-20 slide-up">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate("/projects")}
            className="smooth-transition hover:bg-primary/5 group border border-primary/10 px-8 py-6 text-lg"
          >
            Explore Complete Portfolio
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 smooth-transition" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
