import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Github,
  Eye,
  Code,
  Palette,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import ProjectCard from "@/components/ui/ProjectCard";

const AllProjects = () => {
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const developmentProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with modern payment integration, real-time inventory management, and responsive design.",
      image: project1,
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      live: "#",
      category: "development",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates, team chat, and advanced analytics dashboard.",
      image: project2,
      tech: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      github: "#",
      live: "#",
      category: "development",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with interactive maps, forecasts, and location-based recommendations.",
      image: project3,
      tech: ["Vue.js", "Python", "FastAPI", "Charts.js"],
      github: "#",
      live: "#",
      category: "development",
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description:
        "Comprehensive social media analytics platform with data visualization and performance insights.",
      image: project1,
      tech: ["React", "GraphQL", "MongoDB", "D3.js"],
      github: "#",
      live: "#",
      category: "development",
    },
    {
      id: 5,
      title: "React Component Library",
      description:
        "Modern component library with TypeScript support, documentation, and testing utilities.",
      image: project5,
      tech: ["React", "TypeScript", "Storybook", "Jest"],
      github: "#",
      live: "#",
      category: "development",
    },
  ];

  const designProjects = [
    {
      id: 6,
      title: "Brand Identity Design",
      description:
        "Complete brand identity package including logo design, color palette, typography, and brand guidelines.",
      image: project3,
      tech: ["Adobe Illustrator", "Photoshop", "Figma"],
      behance: "#",
      preview: "#",
      category: "design",
    },
    {
      id: 7,
      title: "Motion Graphics Video",
      description:
        "Animated explainer video with custom illustrations, smooth transitions, and engaging storytelling.",
      image: project4,
      tech: ["After Effects", "Illustrator", "Premiere Pro"],
      behance: "#",
      preview: "#",
      category: "design",
    },
    {
      id: 8,
      title: "Website UI/UX Design",
      description:
        "Modern website design with user research, wireframing, prototyping, and responsive layouts.",
      image: project2,
      tech: ["Figma", "Adobe XD", "Principle"],
      behance: "#",
      preview: "#",
      category: "design",
    },
    {
      id: 9,
      title: "Digital Art Collection",
      description:
        "Creative digital artwork series featuring abstract compositions and vibrant color schemes.",
      image: project6,
      tech: ["Photoshop", "Procreate", "Blender"],
      behance: "#",
      preview: "#",
      category: "design",
    },
    {
      id: 10,
      title: "Print Design Portfolio",
      description:
        "Collection of print materials including brochures, posters, business cards, and packaging design.",
      image: project5,
      tech: ["InDesign", "Illustrator", "Photoshop"],
      behance: "#",
      preview: "#",
      category: "design",
    },
  ];

  const allProjects = [...developmentProjects, ...designProjects];

  const projectImages = [
    project1,
    project2,
    project3,
    project4,
    project5,
    project6,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden py-20">
        {/* Mosaic Background */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="mosaic-scroll grid grid-cols-6 grid-rows-8 h-[200%] w-full">
            {Array.from({ length: 48 }).map((_, index) => (
              <div key={index} className="relative overflow-hidden">
                <img
                  src={projectImages[index % projectImages.length]}
                  alt=""
                  className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300"
                  style={{
                    filter: "blur(1px)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16 slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 hero-text">
              All Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore my complete portfolio of development and design work
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        ref={elementRef}
        className={`pt-10 pb-20 section-fade-in ${isVisible ? "visible" : ""}`}
      >
        <div className="container mx-auto px-6 lg:px-[76px]">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex justify-between gap-4 px-3 w-full grid-cols-3 mb-8 overflow-x-auto md:overflow-auto">
              <TabsTrigger value="all">
                All Projects ({allProjects.length})
              </TabsTrigger>
              <TabsTrigger value="development">
                Development ({developmentProjects.length})
              </TabsTrigger>
              <TabsTrigger value="design">
                Design ({designProjects.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="development" className="space-y-8">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {developmentProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-8">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {designProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
