import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useProjectsStore, Project } from "@/stores/projectsStore";
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
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

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
    <div className="space-y-6 max-w-6xl mx-auto">
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
        <div className="w-full mx-auto">
          <div>Loading projects...</div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="overflow-hidden cursor-pointer"
              onClick={() => navigate(`/admin/projects/${project._id}`)}
            >
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/admin/projects/${project._id}/edit`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(project._id);
                      }}
                    >
                      <HiTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setSelectedProject(null);
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] mt-6">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl border border-border bg-muted">
                  <img
                    src={selectedProject.images?.[0] || selectedProject.image}
                    alt={selectedProject.title}
                    className="h-72 w-full object-cover"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Type
                    </p>
                    <p className="mt-2 font-semibold">{selectedProject.type}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Category
                    </p>
                    <p className="mt-2 font-semibold">
                      {selectedProject.category}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Client
                    </p>
                    <p className="mt-2 font-semibold">
                      {selectedProject.client || "Personal"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Date
                    </p>
                    <p className="mt-2 font-semibold">
                      {new Date(selectedProject.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Project Overview</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Links</h3>
                  <div className="grid gap-3">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <FaGithub className="h-4 w-4" />
                        Source
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <HiExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    )}
                    {selectedProject.behanceUrl && (
                      <a
                        href={selectedProject.behanceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <HiExternalLink className="h-4 w-4" />
                        Behance
                      </a>
                    )}
                    {selectedProject.previewUrl && (
                      <a
                        href={selectedProject.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <HiExternalLink className="h-4 w-4" />
                        Preview
                      </a>
                    )}
                    {selectedProject.videoUrl && (
                      <a
                        href={selectedProject.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition hover:bg-accent"
                      >
                        <HiExternalLink className="h-4 w-4" />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-muted p-5">
                  <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedProject.images?.length > 1 && (
                  <div className="rounded-3xl border border-border bg-muted p-5">
                    <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedProject.images.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`${selectedProject.title} ${index + 1}`}
                          className="h-32 w-full rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
