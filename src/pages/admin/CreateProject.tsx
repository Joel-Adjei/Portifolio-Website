import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import { Button } from "@/components/ui/button";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4 flex gap-2"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
      </Button>
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
