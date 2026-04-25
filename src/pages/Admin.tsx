import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/adminStore";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import AchievementsAdmin from "@/components/admin/AchievementsAdmin";

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useAdminStore();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, navigate]);

  const handleSignOut = () => {
    setIsAdmin(false);
    navigate("/");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
        
        <div className="space-y-8">
          <ProjectsAdmin />
          <AchievementsAdmin />
        </div>
      </div>
    </div>
  );
}
