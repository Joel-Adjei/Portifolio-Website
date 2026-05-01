import React from "react";
import { HiBriefcase } from "react-icons/hi";
import { FaGraduationCap } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { backgrounds } from "@/assets/assets";
import Header from "./common/Header";

interface TimelineEntry {
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
  color: string;
  glow: string;
  border: string;
  badgeClass: string;
}

const timeline: TimelineEntry[] = [
  {
    type: "work",
    title: "Senior Software Engineer",
    organization: "Freelance / Upwork",
    period: "2022 — Present",
    description:
      "Top Rated Plus freelancer delivering full-stack web applications and brand identity systems for clients across Europe and North America. Specialise in React, Node.js, and scalable cloud architectures.",
    skills: ["React", "TypeScript", "Node.js", "AWS", "Figma"],
    color: "text-sky-400",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.4)",
    badgeClass:
      "border-sky-400/30 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20",
  },
  {
    type: "work",
    title: "Full-Stack Developer",
    organization: "TechVentures Ghana",
    period: "2021 — 2022",
    description:
      "Built and maintained multiple client-facing products including an e-commerce platform and an internal HR management system. Led migration from a monolithic PHP codebase to a React + REST API architecture.",
    skills: ["React", "PHP", "MySQL", "Docker", "REST APIs"],
    color: "text-violet-400",
    glow: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.4)",
    badgeClass:
      "border-violet-400/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20",
  },
  {
    type: "education",
    title: "BSc Computer Science",
    organization: "University of Ghana",
    period: "2018 — 2022",
    description:
      "Graduated with First-Class Honors. Focused on software engineering, human-computer interaction, and creative computing. Final-year project: an AI-assisted design feedback tool for non-designers.",
    skills: ["Algorithms", "HCI", "Machine Learning", "Software Engineering"],
    color: "text-violet-400",
    glow: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.4)",
    badgeClass:
      "border-violet-400/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20",
  },
  {
    type: "work",
    title: "Junior Frontend Developer",
    organization: "Creativify Studios",
    period: "2020 — 2021",
    description:
      "Internship that turned permanent. Developed marketing sites and landing pages for regional clients. Introduced the team to component-driven development with React, reducing page build time by 60%.",
    skills: ["React", "JavaScript", "CSS", "Figma", "WordPress"],
    color: "text-emerald-400",
    glow: "rgba(52,211,153,0.25)",
    border: "rgba(52,211,153,0.4)",
    badgeClass:
      "border-emerald-400/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
  },
  {
    type: "education",
    title: "Certificate in Graphic Design",
    organization: "KNUST School of Design",
    period: "2019 — 2020",
    description:
      "Part-time programme covering typography, brand identity, print design, and visual communication. Graduated top of cohort. This programme solidified the design foundation that now underpins all my engineering work.",
    skills: ["Adobe Illustrator", "InDesign", "Typography", "Brand Identity"],
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.25)",
    border: "rgba(251,191,36,0.4)",
    badgeClass:
      "border-amber-400/30 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20",
  },
];

interface CardProps {
  entry: TimelineEntry;
  Icon: React.ElementType;
}

const TimelineCard = ({ entry, Icon }: CardProps) => (
  <div
    className="gloss-skill-card group p-6 flex flex-col gap-4 w-full smooth-transition hover:-translate-y-1"
    style={
      {
        "--card-glow": entry.glow,
        "--card-border": entry.border,
      } as React.CSSProperties
    }
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 shrink-0"
          style={{ boxShadow: `0 0 12px ${entry.glow}` }}
        >
          <Icon className={`w-4 h-4 ${entry.color}`} />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border"
          style={{
            borderColor: entry.border,
            background: entry.glow,
            color: "white",
          }}
        >
          {entry.type === "work" ? "Work" : "Education"}
        </span>
      </div>
      <span className="text-xs font-mono text-white/40 shrink-0">
        {entry.period}
      </span>
    </div>

    <div>
      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
        {entry.title}
      </h3>
      <p className={`text-sm font-medium mt-0.5 ${entry.color}`}>
        {entry.organization}
      </p>
    </div>

    <p className="text-sm text-muted-foreground leading-relaxed">
      {entry.description}
    </p>

    {entry.skills && (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {entry.skills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className={`text-xs px-2 py-0.5 rounded-full border smooth-transition cursor-default ${entry.badgeClass}`}
          >
            {skill}
          </Badge>
        ))}
      </div>
    )}

    <div
      className="h-0.5 w-10 rounded-full mt-auto transition-all duration-500 group-hover:w-full opacity-50"
      style={{ background: entry.border }}
    />
  </div>
);

const Experience = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      className={`relative py-24 bg-secondary/20 overflow-hidden section-fade-in ${isVisible ? "visible" : ""}`}
    >
      <img
        src={backgrounds.bg08}
        className="absolute object-cover w-full h-full opacity-20 top-0 left-0 z-0"
        alt="bg"
      />
      <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 -right-24 w-80 h-80 rounded-full bg-sky-600/8 blur-[100px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 lg:px-[76px]">
        <Header
          label="My Journey"
          mainHeader="Experience & Education"
          description="A timeline of the roles, projects, and learning that shaped the engineer and designer I am today."
        />

        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Vertical centre line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          {/* Mobile left line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

          <div className="space-y-12">
            {timeline.map((entry, index) => {
              const isLeft = index % 2 === 0;
              const Icon =
                entry.type === "work" ? HiBriefcase : FaGraduationCap;

              return (
                <div
                  key={index}
                  className="relative slide-up"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {/* ── Desktop layout ── */}
                  <div className="hidden md:flex items-start">
                    {/* Left half */}
                    <div className="w-1/2 pr-10 flex justify-end">
                      {isLeft ? (
                        <TimelineCard entry={entry} Icon={Icon} />
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="shrink-0 flex items-start justify-center w-0">
                      <div
                        className="w-[30px] h-[30px] rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md -translate-x-1/2 mt-5 z-10"
                        style={{
                          background: `radial-gradient(circle, ${entry.glow}, rgba(0,0,0,0.6))`,
                          boxShadow: `0 0 16px ${entry.glow}`,
                        }}
                      >
                        <Icon
                          className={`w-[36px] h-[36px] p-2 ${entry.color}`}
                        />
                      </div>
                    </div>

                    {/* Right half */}
                    <div className="w-1/2 pl-10 flex justify-start">
                      {!isLeft ? (
                        <TimelineCard entry={entry} Icon={Icon} />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  {/* ── Mobile layout (single column) ── */}
                  <div className="flex md:hidden items-start gap-4 pl-2">
                    <div className="shrink-0 mt-5 z-10">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md"
                        style={{
                          background: `radial-gradient(circle, ${entry.glow}, rgba(0,0,0,0.6))`,
                          boxShadow: `0 0 16px ${entry.glow}`,
                        }}
                      >
                        <Icon className={`w-4 h-4 ${entry.color}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <TimelineCard entry={entry} Icon={Icon} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
