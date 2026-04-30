import ProjectsAdmin from "@/components/admin/ProjectsAdmin";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">Create, update, and delete projects.</p>
      </div>
      <ProjectsAdmin />
    </div>
  );
}
