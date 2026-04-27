import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { backgrounds } from "@/assets/assets";
import Header from "./common/Header";
import { blogPosts } from "@/data/blogPosts";

const tagColors: Record<string, string> = {
  React: "border-cyan-400/30 text-cyan-300 bg-cyan-500/10",
  Accessibility: "border-emerald-400/30 text-emerald-300 bg-emerald-500/10",
  "Design Systems": "border-violet-400/30 text-violet-300 bg-violet-500/10",
  Photography: "border-amber-400/30 text-amber-300 bg-amber-500/10",
  Engineering: "border-sky-400/30 text-sky-300 bg-sky-500/10",
  Creativity: "border-pink-400/30 text-pink-300 bg-pink-500/10",
  DevOps: "border-lime-400/30 text-lime-300 bg-lime-500/10",
  Backend: "border-emerald-400/30 text-emerald-300 bg-emerald-500/10",
  "Best Practices": "border-blue-400/30 text-blue-300 bg-blue-500/10",
  Design: "border-fuchsia-400/30 text-fuchsia-300 bg-fuchsia-500/10",
  "UI/UX": "border-violet-400/30 text-violet-300 bg-violet-500/10",
  CSS: "border-sky-400/30 text-sky-300 bg-sky-500/10",
  Freelancing: "border-amber-400/30 text-amber-300 bg-amber-500/10",
  Career: "border-rose-400/30 text-rose-300 bg-rose-500/10",
  Business: "border-orange-400/30 text-orange-300 bg-orange-500/10",
  Performance: "border-lime-400/30 text-lime-300 bg-lime-500/10",
  Frontend: "border-cyan-400/30 text-cyan-300 bg-cyan-500/10",
  TypeScript: "border-blue-400/30 text-blue-300 bg-blue-500/10",
};

const glows = [
  { glow: "rgba(56,189,248,0.18)", border: "rgba(56,189,248,0.35)" },
  { glow: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.35)" },
  { glow: "rgba(52,211,153,0.18)", border: "rgba(52,211,153,0.35)" },
];

const Blog = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const featured = blogPosts.slice(0, 3);

  return (
    <section
      ref={elementRef}
      className={`relative py-24 bg-background overflow-hidden section-fade-in ${isVisible ? "visible" : ""}`}
    >
      <img
        src={backgrounds.bg05}
        className="absolute object-cover w-full h-full opacity-5 top-0 left-0 z-0"
        alt=""
      />
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-cyan-600/8 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 lg:px-[76px]">
        <Header
          label="Writing"
          mainHeader="Blog & Articles"
          description="Thoughts on software engineering, design, freelancing, and the intersection of creativity and code."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {featured.map((post, index) => {
            const { glow, border } = glows[index % glows.length];
            return (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="gloss-skill-card h-full flex flex-col gap-4 p-7 smooth-transition group-hover:-translate-y-1"
                  style={
                    {
                      "--card-glow": glow,
                      "--card-border": border,
                    } as React.CSSProperties
                  }
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`text-xs px-2 py-0.5 rounded-full border ${tagColors[tag] ?? "border-white/20 text-white/60 bg-white/5"}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/8">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 smooth-transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="smooth-transition hover:glow-effect group"
            asChild
          >
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
