import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HiArrowLeft,
  HiExternalLink,
  HiCalendar,
  HiUser,
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { error } from "@/assets/assets";
import { useEffect, useState } from "react";
import { useProject } from "@/hooks/queries";

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  );
  return match ? match[1] : null;
};

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: project, isLoading: loading } = useProject(id);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const images = project?.images?.length ? project.images : [project?.image];
  const prev = () =>
    setCurrentIndex(
      (i) => (i - 1 + (images?.length || 1)) % (images?.length || 1),
    );
  const next = () => setCurrentIndex((i) => (i + 1) % (images?.length || 1));
  const videoId = project?.videoUrl ? getYouTubeId(project.videoUrl) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden px-6">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 mosaic-scroll" />
        </div>

        <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
          {/* Animated Illustration */}
          <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-75 group-hover:scale-100 transition-transform duration-700" />
            <img
              src={error.notFoundIllustration}
              alt="Project Not Found"
              className="w-72 md:w-96 h-auto relative z-10 drop-shadow-[0_0_30px_rgba(var(--primary),0.3)] rounded-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-black hero-text tracking-tight">
              Project Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              It seems the project you're looking for has been moved or doesn't
              exist in our current archives.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold glow-effect hover:scale-105 transition-all"
              onClick={() => navigate("/")}
            >
              <HiArrowLeft className="mr-2 h-5 w-5" />
              Back to Portfolio
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold border-white/10 hover:bg-white/5 transition-all"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>

          {/* Debug Info */}
          <div className="mt-12 pt-6 border-t border-white/5 w-full">
            <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">
              Resource ID:{" "}
              <span className="text-accent/50">{id || "undefined"}</span> •
              Status:{" "}
              <span className="text-destructive/50">Null Reference</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}

      {/* Hero Section */}
      <section className="">
        <div className="container relative  overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute h-full w-full left-0 object-cover top-0 z-0 opacity-30 lg:opacity-100"
          />
          <div className="h-[620px] w-full bg-gradient-to-t from-black to-black/0 left-0 absolute bottom-0 z-10" />

          <div className="absolute top-14 left-0 px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="smooth-transition hover:glow-effect hover:bg-gray-700/30 hover:border border-blue-400 hover:text-white"
            >
              <HiArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-36 pb-7  z-20">
            <div className="space-y-6 slide-up  z-20">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  {project.type}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {project.title}
                </h1>
                <p className="text-lg text-white leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.type === "development" ? (
                  <>
                    <Button
                      size="lg"
                      className="glow-effect group"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <HiExternalLink className="mr-2 h-4 w-4" />
                      View Live Site
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="smooth-transition hover:glow-effect"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <FaGithub className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="glow-effect group"
                      onClick={() => window.open(project.behanceUrl, "_blank")}
                    >
                      <HiExternalLink className="mr-2 h-4 w-4" />
                      View on Behance
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="smooth-transition hover:glow-effect"
                      onClick={() => window.open(project.previewUrl, "_blank")}
                    >
                      <HiExternalLink className="mr-2 h-4 w-4" />
                      Live Preview
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div
              className="relative fade-in z-20"
              style={{ animationDelay: "0.3s" }}
            >
              <Card className="overflow-hidden border-2 border-primary/20 glow-effect z-20">
                <div className="aspect-video relative">
                  <img
                    src={images[currentIndex]}
                    alt={`${project.title} ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 transition-all"
                      >
                        <HiChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 transition-all"
                      >
                        <HiChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              i === currentIndex
                                ? "w-5 bg-white"
                                : "w-1.5 bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Project Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Video Demo */}
              {videoId && (
                <section className="py-16">
                  <div className=" mx-auto px-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30">
                        <HiPlay className="h-4 w-4 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold">Video Demo</h2>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] aspect-video w-full max-w-4xl mx-auto">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${project.title} demo`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4 skill-card">
                <h3 className="text-xl font-semibold">Project Details</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <HiCalendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <HiUser className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Client:</span>
                    <span>{project.client}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 skill-card">
                <h3 className="text-xl font-semibold">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6 space-y-4 skill-card">
                <h3 className="text-xl font-semibold">Links</h3>
                <div className="space-y-2">
                  {project.type === "development" ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <HiExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <FaGithub className="mr-2 h-4 w-4" />
                        Source Code
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          window.open(project.behanceUrl, "_blank")
                        }
                      >
                        <HiExternalLink className="mr-2 h-4 w-4" />
                        View on Behance
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          window.open(project.previewUrl, "_blank")
                        }
                      >
                        <HiExternalLink className="mr-2 h-4 w-4" />
                        Live Preview
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
