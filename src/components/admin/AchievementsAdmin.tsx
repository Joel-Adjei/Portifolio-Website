import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAchievementsStore } from "@/stores/achievementsStore";

export default function AchievementsAdmin() {
  const { achievements, addAchievement, deleteAchievement } = useAchievementsStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleAdd = () => {
    if (!title || !description) return;

    addAchievement({
      title,
      description,
      type: "award",
      organization: "Unknown",
      date: new Date().toISOString().split('T')[0],
    });

    toast({ title: "Success", description: "Achievement added!" });
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id: string) => {
    deleteAchievement(id);
    toast({ title: "Success", description: "Achievement deleted!" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Achievements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {achievements.map((achievement) => (
              <TableRow key={achievement.id}>
                <TableCell>{achievement.title}</TableCell>
                <TableCell>{achievement.description}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(achievement.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
