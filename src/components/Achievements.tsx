import { Trophy, Award, Medal, Star, GraduationCap, Briefcase, ExternalLink } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Header from "./common/Header";
import { backgrounds } from "@/assets/assets";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const achievementList = [
  {
    icon: Trophy,
    title: "Top Rated Plus Freelancer",
    description: "Ranked among the top 3% of designers and developers globally on Upwork with a 100% job success score.",
    date: "2024",
    color: "text-amber-400",
    glow: "rgba(251,191,36,0.25)",
    border: "rgba(251,191,36,0.4)",
  },
  {
    icon: Award,
    title: "Excellence in Visual Storytelling",
    description: "Awarded 'Best Visual Narrative' at the National Digital Arts Exhibition for the 'Urban Echoes' series.",
    date: "2023",
    color: "text-sky-400",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.4)",
  },
  {
    icon: GraduationCap,
    title: "BSc Computer Science",
    description: "Graduated with First-Class Honors. Specialized in Creative Coding and User Interface Design.",
    date: "2022",
    color: "text-violet-400",
    glow: "rgba(167,139,250,0.25)",
    border: "rgba(167,139,250,0.4)",
  },
  {
    icon: Medal,
    title: "Global Hackathon Finalist",
    description: "Led a team of four to the finals of the 'Build the Future' hackathon, developing an AI-driven accessibility tool.",
    date: "2023",
    color: "text-emerald-400",
    glow: "rgba(52,211,153,0.25)",
    border: "rgba(52,211,153,0.4)",
  },
];

const Achievements = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

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
          {achievementList.map((item, index) => (
            <div
              key={index}
              className="gloss-skill-card group p-8 flex flex-col gap-4 smooth-transition"
              style={{
                "--card-glow": item.glow,
                "--card-border": item.border,
                animationDelay: `${index * 150}ms`,
              } as React.CSSProperties}
            >
              {/* Year Badge */}
              <div className="absolute top-6 right-8 text-xs font-mono font-bold tracking-widest text-white/40 uppercase">
                {item.date}
              </div>

              {/* Icon Container */}
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 border border-white/10 backdrop-blur-md bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                style={{
                  boxShadow: `0 0 20px ${item.glow}`,
                }}
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
                <div className={`h-1 w-12 rounded-full transition-all duration-500 group-hover:w-20`} 
                  style={{ background: item.color }}
                />
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <div className="h-1 w-1 rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/achievements">
            <Button
              variant="outline"
              size="lg"
              className="smooth-transition hover:glow-effect group"
            >
              View All Milestones
              <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
