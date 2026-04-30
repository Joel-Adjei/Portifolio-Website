import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import ProjectCard from "@/components/ui/ProjectCard";
import { backgrounds, objects } from "@/assets/assets";

const AllProjects = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <img
            src={backgrounds.bg04}
            alt=""
            className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300"
            style={{
              filter: "blur(1px)",
            }}
          />
        </div>
        <img
          src={objects.code2}
          className="absolute size-[300px] lg:size-fit object-contain -right-10  -bottom-28 lg:-bottom-16 opacity-10"
        />

        <img
          src={objects.design3d}
          className="hidden md:block size-[300px] absolute  rotate-42 object-contain -left-10  -bottom-28 lg:-bottom-12 opacity-5"
        />

        <div className="container mx-auto px-6">
          <div className="text-center mb- slide-up">
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
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects ({allProjects.length})</SelectItem>
                <SelectItem value="development">Development ({developmentProjects.length})</SelectItem>
                <SelectItem value="design">Design ({designProjects.length})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-20">
              No projects match your search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProjects;
