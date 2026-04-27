import {
  Trophy,
  Award,
  Medal,
  Star,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Header from "./common/Header";
import { backgrounds } from "@/assets/assets";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";

const achievementList = [
  {
    icon: Trophy,
    title: "Top Rated Plus Freelancer",
    description:
      "Ranked among the top 3% of designers and developers globally on Upwork with a 100% job success score.",
    date: "2024",
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.25)",
    border: "rgba(251,191,36,0.4)",
    type: "Award",
  },
  {
    icon: Award,
    title: "Excellence in Visual Storytelling",
    description:
      "Awarded 'Best Visual Narrative' at the National Digital Arts Exhibition for the 'Urban Echoes' series.",
    date: "2023",
    color: "text-sky-400",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.4)",
    type: "Recognition",
  },
  {
    icon: GraduationCap,
    title: "BSc Computer Science",
    description:
      "Graduated with First-Class Honors. Specialized in Creative Coding and User Interface Design.",
    date: "2022",
    color: "text-violet-400",
    glow: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.4)",
    type: "Certification",
  },
  {
    icon: Medal,
    title: "Global Hackathon Finalist",
    description:
      "Led a team of four to the finals of the 'Build the Future' hackathon, developing an AI-driven accessibility tool.",
    date: "2023",
    color: "text-emerald-400",
    glow: "rgba(52,211,153,0.25)",
    border: "rgba(52,211,153,0.4)",
    type: "Award",
  },
  {
    icon: Award,
    title: "Full Stack Developer Certification",
    description:
      "Comprehensive certification covering modern web development technologies including React, Node.js, and cloud deployment.",
    date: "2023",
    color: "text-sky-400",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.4)",
    type: "Certification",
  },
  {
    icon: Trophy,
    title: "Best Innovation Award",
    description:
      "Recognized for developing an AI-powered task management solution that increased team productivity by 40%.",
    date: "2023",
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.25)",
    border: "rgba(251,191,36,0.4)",
    type: "Award",
  },
  {
    icon: Star,
    title: "Open Source Contributor",
    description:
      "Active contributor to various open source projects with over 500+ commits and 50+ pull requests merged.",
    date: "2022–Present",
    color: "text-pink-400",
    glow: "rgba(244,114,182,0.25)",
    border: "rgba(244,114,182,0.4)",
    type: "Recognition",
  },
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description:
      "First place winner in 48-hour hackathon for creating a sustainable energy monitoring dashboard.",
    date: "2022",
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.25)",
    border: "rgba(251,191,36,0.4)",
    type: "Award",
  },
  {
    icon: Award,
    title: "AWS Cloud Practitioner",
    description:
      "Foundational certification in cloud computing concepts, AWS services, and cloud architecture best practices.",
    date: "2021",
    color: "text-orange-400",
    glow: "rgba(251,146,60,0.25)",
    border: "rgba(251,146,60,0.4)",
    type: "Certification",
  },
];

const typeColors: Record<string, string> = {
  Award: "bg-amber-500/20 text-amber-400 border-amber-400/30",
  Certification: "bg-sky-500/20 text-sky-400 border-sky-400/30",
  Recognition: "bg-pink-500/20 text-pink-400 border-pink-400/30",
};

const Achievements = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [open, setOpen] = useState(false);
  const preview = achievementList.slice(0, 4);

  return (
    <section
      ref={elementRef}
      className={`relative py-24 bg-background overflow-hidden section-fade-in ${isVisible ? "visible" : ""}`}
    >
      {/* Background Elements */}
      <img
        src={backgrounds.bg03}
        className="absolute object-cover w-full h-full opacity-5 top-0 left-0 z-0"
        alt=""
      />
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <Header
          label="Milestones"
          mainHeader="Achievements & Recognition"
          description="A journey of continuous learning, creative excellence, and impactful contributions to the digital landscape."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-5xl mx-auto">
          {preview.map((item, index) => (
            <div
              key={index}
              className="gloss-skill-card group p-8 flex flex-col gap-4 smooth-transition"
              style={
                {
                  "--card-glow": item.glow,
                  "--card-border": item.border,
                  animationDelay: `${index * 150}ms`,
                } as React.CSSProperties
              }
            >
              {/* Year Badge */}
              <div className="absolute top-6 right-8 text-xs font-mono font-bold tracking-widest text-white/40 uppercase">
                {item.date}
              </div>

              {/* Icon Container */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 border border-white/10 backdrop-blur-md bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ boxShadow: `0 0 20px ${item.glow}` }}
              >
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="mt-auto pt-4 flex items-center gap-2">
                <div
                  className="h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20"
                  style={{ background: item.color }}
                />
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <div className="h-1 w-1 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            className="smooth-transition hover:glow-effect group"
            onClick={() => setOpen(true)}
          >
            View All Milestones
            <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>

      {/* All Milestones Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto bg-background border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              All Milestones
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {achievementList.map((item, index) => (
              <div
                key={index}
                className="gloss-skill-card group p-6 flex flex-col gap-3 smooth-transition"
                style={
                  {
                    "--card-glow": item.glow,
                    "--card-border": item.border,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md bg-white/5"
                    style={{ boxShadow: `0 0 16px ${item.glow}` }}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs border ${typeColors[item.type] ?? ""}`}
                    >
                      {item.type}
                    </Badge>
                    <span className="text-xs font-mono text-white/40">
                      {item.date}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Achievements;
