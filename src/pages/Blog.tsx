import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiClock, HiCalendar, HiSearch } from "react-icons/hi";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
import Header from "@/components/common/Header";
import { backgrounds } from "@/assets/assets";

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

const glowCycle = [
  { glow: "rgba(56,189,248,0.18)", border: "rgba(56,189,248,0.35)" },
  { glow: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.35)" },
  { glow: "rgba(52,211,153,0.18)", border: "rgba(52,211,153,0.35)" },
  { glow: "rgba(251,191,36,0.18)", border: "rgba(251,191,36,0.35)" },
  { glow: "rgba(244,114,182,0.18)", border: "rgba(244,114,182,0.35)" },
  { glow: "rgba(251,146,60,0.18)", border: "rgba(251,146,60,0.35)" },
];

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

const BlogPage = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = blogPosts.filter((post) => {
    const matchesQuery =
      query.trim() === "" ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesTag = activeTag === null || post.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <img
        src={backgrounds.bg05}
        className="fixed object-cover w-full h-full opacity-5 top-0 left-0 z-0"
        alt=""
      />
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-cyan-600/8 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-16 pt-32 pb-24">
        <Header
          label="Writing"
          mainHeader="Blog & Articles"
          description="Thoughts on software engineering, design, freelancing, and the intersection of creativity and code."
        />

        {/* Search + filter */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-3xl mx-auto">
          <div className="relative flex-1 w-full">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mt-4 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs px-3 py-1 rounded-full border smooth-transition ${
              activeTag === null
                ? "border-primary/60 text-primary bg-primary/10"
                : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-xs px-3 py-1 rounded-full border smooth-transition ${
                activeTag === tag
                  ? (tagColors[tag] ?? "border-white/30 text-white/80")
                  : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filtered.map((post, index) => {
            const { glow, border } = glowCycle[index % glowCycle.length];
            return (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group block"
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
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={`text-xs px-2 py-0.5 rounded-full border ${tagColors[tag] ?? "border-white/20 text-white/60 bg-white/5"}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/8">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <HiCalendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiClock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <HiArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 smooth-transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16">
            No articles match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
