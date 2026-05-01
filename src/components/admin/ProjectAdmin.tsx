import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjectsStore } from "@/stores/projectsStore";
import { useToast } from "@/hooks/use-toast";
import {
  HiExternalLink,
  HiTrash,
  HiPlus,
  HiCalendar,
  HiUser,
} from "react-icons/hi";
import { MdColorLens } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function ProjectAdmin() {
  const { projects, loading, fetchProjects, deleteProject } =
    useProjectsStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast({ title: "Success", description: "Project removed" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not remove project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Browse existing projects and manage your portfolio cards.
          </p>
        </div>

        <Link to="/admin/projects/create">
          <Button>
            <HiPlus className="h-4 w-4 mr-2" /> Create project
          </Button>
        </Link>
      </div>

      {loading ? (
        <Card>
          <CardContent>Loading projects...</CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              <div className="h-48 overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant={
                      project.type === "development" ? "default" : "secondary"
                    }
                    className="uppercase text-[11px] tracking-[.2em]"
                  >
                    {project.type}
                  </Badge>
                  <Badge variant="outline" className="text-[11px]">
                    {project.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="grid gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <HiCalendar className="h-4 w-4" />
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <HiUser className="h-4 w-4" />
                    {project.client || "Personal"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex flex-wrap gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <FaGithub className="h-4 w-4" />
                        Source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <HiExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    )}
                    {project.previewUrl && !project.liveUrl && (
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <HiExternalLink className="h-4 w-4" />
                        Preview
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2 flex-wrap">
                    {project.type === "design" && (
                      <Badge variant="secondary">Design</Badge>
                    )}
                    {project.type === "development" && (
                      <Badge variant="default">Development</Badge>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project._id)}
                  >
                    <HiTrash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
