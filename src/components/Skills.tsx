import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Palette,
  Film,
  Type,
  Layers,
  Wand2,
  Code2,
  Database,
  Globe,
  Smartphone,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { backgrounds, icons, projects } from "@/assets/assets";
import Header from "./common/Header";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const skillCategories = [
  {
    icon: Camera,
    title: "Photography",
    skills: ["Portrait", "Landscape", "Product", "Event", "Street", "Aerial"],
    color: "text-sky-400",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.4)",
    iconBg: "rgba(56,189,248,0.12)",
    badge:
      "border-sky-400/30 text-sky-300 hover:bg-sky-400 hover:text-white hover:border-sky-400",
    logos: [
      `${DI}/lightroom/lightroom-original.svg`,
      `${DI}/photoshop/photoshop-original.svg`,
    ],
    images: [projects.project1, projects.project3, projects.project5],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    skills: [
      "Brand Identity",
      "Logo Design",
      "Typography",
      "Color Theory",
      "Illustration",
      "Packaging",
    ],
    color: "text-violet-400",
    glow: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.4)",
    iconBg: "rgba(167,139,250,0.12)",
    badge:
      "border-violet-400/30 text-violet-300 hover:bg-violet-500 hover:text-white hover:border-violet-400",
    logos: [icons.ps, `${DI}/illustrator/illustrator-plain.svg`],
    images: [projects.project4, projects.project6, projects.project2],
  },
  {
    icon: Wand2,
    title: "Photo Editing",
    skills: [
      "Adobe Lightroom",
      "Photoshop",
      "Capture One",
      "Retouching",
      "Color Grading",
      "Compositing",
    ],
    color: "text-pink-400",
    glow: "rgba(244,114,182,0.25)",
    border: "rgba(244,114,182,0.4)",
    iconBg: "rgba(244,114,182,0.12)",
    badge:
      "border-pink-400/30 text-pink-300 hover:bg-pink-500 hover:text-white hover:border-pink-400",
    logos: [icons.ps, `${DI}/lightroom/lightroom-original.svg`],
    images: [projects.project2, projects.project5, projects.project7],
  },
  {
    icon: Layers,
    title: "Design Tools",
    skills: [
      "Adobe Illustrator",
      "InDesign",
      "Figma",
      "Adobe XD",
      "Canva",
      "Affinity",
    ],
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.22)",
    border: "rgba(251,191,36,0.38)",
    iconBg: "rgba(251,191,36,0.1)",
    badge:
      "border-amber-400/30 text-amber-300 hover:bg-amber-500 hover:text-white hover:border-amber-400",
    logos: [icons.figma, `${DI}/xd/xd-plain.svg`],
    images: [projects.project3, projects.project1, projects.project6],
  },
  {
    icon: Film,
    title: "Video & Motion",
    skills: [
      "Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Motion Graphics",
      "Color Correction",
    ],
    color: "text-emerald-400",
    glow: "rgba(52,211,153,0.22)",
    border: "rgba(52,211,153,0.38)",
    iconBg: "rgba(52,211,153,0.1)",
    badge:
      "border-emerald-400/30 text-emerald-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-400",
    logos: [
      `${DI}/premierepro/premierepro-original.svg`,
      `${DI}/aftereffects/aftereffects-original.svg`,
    ],
    images: [projects.project5, projects.project7, projects.project3],
  },
  {
    icon: Type,
    title: "Print & Publishing",
    skills: [
      "Print Design",
      "Editorial Layout",
      "Brochures",
      "Posters",
      "Infographics",
      "Signage",
    ],
    color: "text-orange-400",
    glow: "rgba(251,146,60,0.22)",
    border: "rgba(251,146,60,0.38)",
    iconBg: "rgba(251,146,60,0.1)",
    badge:
      "border-orange-400/30 text-orange-300 hover:bg-orange-500 hover:text-white hover:border-orange-400",
    logos: [
      `${DI}/indesign/indesign-original.svg`,
      `${DI}/illustrator/illustrator-plain.svg`,
    ],
    images: [projects.project6, projects.project4, projects.project1],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
    color: "text-cyan-400",
    glow: "rgba(34,211,238,0.22)",
    border: "rgba(34,211,238,0.38)",
    iconBg: "rgba(34,211,238,0.1)",
    badge:
      "border-cyan-400/30 text-cyan-300 hover:bg-cyan-500 hover:text-white hover:border-cyan-400",
    logos: [icons.react, icons.css],
    images: [projects.project7, projects.project2, projects.project5],
  },
  {
    icon: Database,
    title: "Backend Development",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Express",
      "REST APIs",
    ],
    color: "text-lime-400",
    glow: "rgba(163,230,53,0.22)",
    border: "rgba(163,230,53,0.38)",
    iconBg: "rgba(163,230,53,0.1)",
    badge:
      "border-lime-400/30 text-lime-300 hover:bg-lime-500 hover:text-white hover:border-lime-400",
    logos: [
      `${DI}/nodejs/nodejs-original.svg`,
      `${DI}/python/python-original.svg`,
    ],
    images: [projects.project3, projects.project6, projects.project4],
  },
  {
    icon: Globe,
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    color: "text-blue-400",
    glow: "rgba(96,165,250,0.22)",
    border: "rgba(96,165,250,0.38)",
    iconBg: "rgba(96,165,250,0.1)",
    badge:
      "border-blue-400/30 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-blue-400",
    logos: [
      `${DI}/docker/docker-original.svg`,
      `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    ],
    images: [projects.project1, projects.project4, projects.project7],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
    color: "text-fuchsia-400",
    glow: "rgba(232,121,249,0.22)",
    border: "rgba(232,121,249,0.38)",
    iconBg: "rgba(232,121,249,0.1)",
    badge:
      "border-fuchsia-400/30 text-fuchsia-300 hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-400",
    logos: [icons.react, `${DI}/flutter/flutter-original.svg`],
    images: [projects.project5, projects.project2, projects.project6],
  },
  {
    icon: GitBranch,
    title: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "Jira", "Agile", "Figma"],
    color: "text-rose-400",
    glow: "rgba(251,113,133,0.22)",
    border: "rgba(251,113,133,0.38)",
    iconBg: "rgba(251,113,133,0.1)",
    badge:
      "border-rose-400/30 text-rose-300 hover:bg-rose-500 hover:text-white hover:border-rose-400",
    logos: [icons.vscode, icons.figma],
    images: [projects.project2, projects.project7, projects.project3],
  },
];

const Skills = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    }, 3500);
    return () => clearInterval(timer);
  }, [api, isPaused]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section
      ref={elementRef}
      className={`relative bg-secondary/30 section-fade-in ${isVisible ? "visible" : ""}`}
    >
      <img
        src={backgrounds.bg06}
        className="absolute object-cover w-full h-full rotate-180 opacity-5 z-0"
        alt=""
      />
      <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-violet-600/8 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full bg-sky-600/8 blur-3xl pointer-events-none z-0" />

      <div className="container relative py-24 mx-auto px-0 z-10">
        <div className="mb-16">
          <Header
            label="Expertise"
            mainHeader="Skills & Specialities"
            description="Crafting visual stories through the lens and the canvas — from raw captures to polished brand identities."
          />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background/90 to-transparent z-10 pointer-events-none" />

          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "center",
              skipSnaps: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6 lg:-ml-8 items-center py-10">
              {skillCategories.map((cat, index) => {
                const isActive = index === current;
                return (
                  <CarouselItem
                    key={cat.title}
                    className="pl-4 sm:pl-6 lg:pl-8 basis-[85%] sm:basis-[55%] lg:basis-[38%] transition-all duration-500 ease-in-out"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(0.85)",
                      opacity: isActive ? 1 : 0.4,
                      filter: isActive ? "blur(0)" : "blur(1px)",
                      zIndex: isActive ? 20 : 10,
                    }}
                  >
                    <div className="h-full">
                      <div
                        className="gloss-skill-card group relative h-[500px] flex flex-col smooth-transition"
                        style={
                          {
                            "--card-glow": cat.glow,
                            "--card-border": cat.border,
                            boxShadow: isActive
                              ? `0 20px 50px -12px ${cat.glow}, 0 0 20px ${cat.glow}`
                              : "none",
                          } as React.CSSProperties
                        }
                      >
                        {/* Coloured top accent line */}
                        <div
                          className="absolute top-0 left-8 right-8 h-px rounded-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${cat.border}, transparent)`,
                          }}
                        />

                        {/* ── Floating logos ── */}
                        <div className="absolute top-3 right-6 flex gap-3 z-20">
                          {cat.logos.map((src, i) => (
                            <div
                              key={i}
                              className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border border-white/15 backdrop-blur-md shadow-xl transition-transform duration-500 group-hover:scale-110"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                boxShadow: `0 0 20px ${cat.glow}`,
                              }}
                            >
                              <img
                                src={src}
                                alt=""
                                className="w-7 h-7 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* ── Upper content ── */}
                        <div className="relative z-10 pt-10 px-8 pb-6 flex flex-col h-full">
                          {/* Title bar */}
                          <div
                            className="w-fit rounded-lg px-5 py-2.5 mb-8 flex items-center gap-3"
                            style={{
                              background: "rgba(0,0,0,0.6)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <cat.icon
                              className={`h-5 w-5 shrink-0 ${cat.color}`}
                              style={{
                                filter: `drop-shadow(0 0 8px ${cat.glow})`,
                              }}
                            />
                            <h3 className="font-bold text-base text-white tracking-wider uppercase">
                              {cat.title}
                            </h3>
                          </div>

                          {/* Skill badges */}
                          <div className="flex flex-wrap gap-2 mb-10">
                            {cat.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className={`text-sm px-3 py-1 smooth-transition cursor-default rounded-full bg-black/20 ${cat.badge}`}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {/* ── Fan images ── */}
                          <div className="relative h-56 mt-auto mx-auto w-full max-w-[280px]">
                            {/* Left */}
                            <img
                              src={cat.images[0]}
                              alt=""
                              className="absolute left-0 -bottom-14 w-32 h-44 object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:-translate-x-4 group-hover:-rotate-12"
                              style={{
                                transform: "rotate(-12deg)",
                                transformOrigin: "bottom center",
                                filter: "brightness(0.6) contrast(1.2)",
                                border: `1px solid ${cat.border}`,
                              }}
                            />
                            {/* Right */}
                            <img
                              src={cat.images[2]}
                              alt=""
                              className="absolute right-0 -bottom-14 w-32 h-44 object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:translate-x-4 group-hover:rotate-12"
                              style={{
                                transform: "rotate(12deg)",
                                transformOrigin: "bottom center",
                                filter: "brightness(0.6) contrast(1.2)",
                                border: `1px solid ${cat.border}`,
                              }}
                            />
                            {/* Center — on top */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-36 h-48 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                              <img
                                src={cat.images[1]}
                                alt=""
                                className="w-full h-full object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                style={{
                                  border: `2px solid ${cat.border}`,
                                  boxShadow: `0 0 30px ${cat.glow}`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bottom glow on hover */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[16px] pointer-events-none"
                          style={{
                            background: `linear-gradient(to top, ${cat.glow}, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Nav buttons */}
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center smooth-transition
              bg-black/40 border border-white/10 backdrop-blur-xl
              hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 shadow-2xl text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center smooth-transition
              bg-black/40 border border-white/10 backdrop-blur-xl
              hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 shadow-2xl text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {Array.from({ length: count }).map((_, i) => {
            const cat = skillCategories[i % skillCategories.length];
            return (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full smooth-transition overflow-hidden group relative"
                style={{
                  width: i === current ? "32px" : "10px",
                  height: "10px",
                  background:
                    i === current ? cat.border : "rgba(255,255,255,0.1)",
                  boxShadow: i === current ? `0 0 15px ${cat.glow}` : "none",
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
