import ProjectsAdmin from "@/components/admin/ProjectsAdmin";

export default function CreateProject() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold">Create Project</h1>
        <p className="text-muted-foreground mt-1">
          Add a new portfolio project using the dedicated creation form.
        </p>
      </div>
      <ProjectsAdmin />
    </div>
  );
}
