import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
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

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === id);
  const currentIndex = blogPosts.findIndex((p) => p.id === id);
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const next =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-2xl font-bold text-white">Article not found.</p>
        <Button variant="outline" onClick={() => navigate("/blog")}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <img
        src={backgrounds.bg05}
        className="fixed object-cover w-full h-full opacity-5 top-0 left-0 z-0"
        alt=""
      />
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-cyan-600/8 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-violet-600/8 blur-[100px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-16 pt-32 pb-24 max-w-4xl">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white smooth-transition mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 smooth-transition" />
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={`text-xs px-2.5 py-1 rounded-full border ${tagColors[tag] ?? "border-white/20 text-white/60 bg-white/5"}`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 hero-text">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 pb-8 border-b border-white/10">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </span>
        </div>

        {/* Content */}
        <article
          className="prose-blog text-base leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Prev / Next navigation */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/blog/${prev.id}`}
              className="group gloss-skill-card p-5 flex flex-col gap-2 smooth-transition hover:-translate-y-1"
              style={
                {
                  "--card-glow": "rgba(56,189,248,0.15)",
                  "--card-border": "rgba(56,189,248,0.3)",
                } as React.CSSProperties
              }
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                Previous article
              </span>
              <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300 leading-snug">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/blog/${next.id}`}
              className="group gloss-skill-card p-5 flex flex-col gap-2 text-right smooth-transition hover:-translate-y-1 sm:items-end"
              style={
                {
                  "--card-glow": "rgba(167,139,250,0.15)",
                  "--card-border": "rgba(167,139,250,0.3)",
                } as React.CSSProperties
              }
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                Next article
                <ArrowRight className="w-3 h-3" />
              </span>
              <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300 leading-snug">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
