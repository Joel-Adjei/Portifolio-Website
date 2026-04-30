import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectsStore } from "@/stores/projectsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HiCode,
  HiCalendar,
  HiUser,
  HiExternalLink,
  HiTrash,
  HiPencil,
  HiPlus,
  HiX,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";

export default function ProjectsAdmin() {
  const {
    projects,
    loading,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  } = useProjectsStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Form state
  const [type, setType] = useState<"development" | "design">("development");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [client, setClient] = useState("");
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [behanceUrl, setBehanceUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setClient("");
    setTechnologies([]);
    setTechInput("");
    setImageFile(null);
    setImageFiles([]);
    setGithubUrl("");
    setLiveUrl("");
    setBehanceUrl("");
    setPreviewUrl("");
    setVideoUrl("");
    setType("development");
    setEditingId(null);
  };

  const loadProjectForEdit = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (!project) return;

    setEditingId(projectId);
    setType(project.type as "development" | "design");
    setTitle(project.title);
    setDescription(project.description);
    setLongDescription(project.longDescription);
    setCategory(project.category);
    setDate(project.date);
    setClient(project.client);
    setTechnologies(project.technologies);
    setGithubUrl(project.githubUrl || "");
    setLiveUrl(project.liveUrl || "");
    setBehanceUrl(project.behanceUrl || "");
    setPreviewUrl(project.previewUrl || "");
    setVideoUrl(project.videoUrl || "");
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !imageFile) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("longDescription", longDescription);
      formData.append("category", category);
      formData.append("type", type);
      formData.append("date", date);
      formData.append("client", client);
      formData.append("technologies", technologies.join(","));
      formData.append("image", imageFile);
      imageFiles.forEach((file) => formData.append("images", file));
      if (githubUrl) formData.append("githubUrl", githubUrl);
      if (liveUrl) formData.append("liveUrl", liveUrl);
      if (behanceUrl) formData.append("behanceUrl", behanceUrl);
      if (previewUrl) formData.append("previewUrl", previewUrl);
      if (videoUrl) formData.append("videoUrl", videoUrl);

      if (editingId) {
        await updateProject(editingId, formData);
        toast({ title: "Success", description: "Project updated!" });
      } else {
        await addProject(formData);
        toast({ title: "Success", description: "Project added!" });
      }

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      toast({ title: "Success", description: "Project deleted!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {editingId ? (
            <HiPencil className="h-5 w-5" />
          ) : (
            <HiPlus className="h-5 w-5" />
          )}
          {editingId ? "Edit Project" : "Create New Project"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Type Selector */}
        <div className="space-y-2">
          <Label>Project Type *</Label>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={type === "development" ? "default" : "outline"}
              className="h-auto py-4"
              onClick={() => setType("development")}
            >
              <HiCode className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Development</div>
                <div className="text-xs opacity-70">Software projects</div>
              </div>
            </Button>
            <Button
              type="button"
              variant={type === "design" ? "default" : "outline"}
              className="h-auto py-4"
              onClick={() => setType("design")}
            >
              <MdColorLens className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Design</div>
                <div className="text-xs opacity-70">Graphic & Motion</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Main Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description for project cards"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDescription">Project Overview</Label>
              <Textarea
                id="longDescription"
                placeholder="Detailed description for project details page"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={6}
              />
            </div>
          </div>

          {/* Right Column - Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {type === "development" ? (
                    <>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="ui/ux">UI/UX Design</SelectItem>
                      <SelectItem value="motion">Motion Design</SelectItem>
                      <SelectItem value="illustration">Illustration</SelectItem>
                      <SelectItem value="graphic">Graphic Design</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <HiCalendar className="h-4 w-4" />
                Project Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client" className="flex items-center gap-2">
                <HiUser className="h-4 w-4" />
                Client Name
              </Label>
              <Input
                id="client"
                placeholder="Client or personal project"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Cover Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Additional Images</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setImageFiles(Array.from(e.target.files || []))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies / Tools</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddTechnology())
                  }
                />
                <Button type="button" onClick={handleAddTechnology} size="icon">
                  <HiPlus className="h-4 w-4" />
                </Button>
              </div>
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="gap-1">
                      {tech}
                      <HiX
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTechnology(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conditional URLs based on type */}
        <Card className="p-4 bg-muted/30">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <HiExternalLink className="h-4 w-4" />
            Project Links
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {type === "development" ? (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="githubUrl"
                    className="flex items-center gap-2"
                  >
                    <FaGithub className="h-4 w-4" />
                    GitHub URL
                  </Label>
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveUrl" className="flex items-center gap-2">
                    <HiExternalLink className="h-4 w-4" />
                    Live Demo URL
                  </Label>
                  <Input
                    id="liveUrl"
                    placeholder="https://example.com"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="behanceUrl"
                    className="flex items-center gap-2"
                  >
                    <HiExternalLink className="h-4 w-4" />
                    Behance URL
                  </Label>
                  <Input
                    id="behanceUrl"
                    placeholder="https://behance.net/..."
                    value={behanceUrl}
                    onChange={(e) => setBehanceUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="previewUrl"
                    className="flex items-center gap-2"
                  >
                    <HiExternalLink className="h-4 w-4" />
                    Preview URL
                  </Label>
                  <Input
                    id="previewUrl"
                    placeholder="https://example.com"
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : editingId
                ? "Update Project"
                : "Create Project"}
          </Button>
          {editingId && (
            <Button onClick={resetForm} variant="outline" disabled={submitting}>
              Cancel
            </Button>
          )}
        </div>

        {/* Projects List */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Existing Projects</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.type === "development"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.type === "development" ? (
                          <HiCode className="h-3 w-3 mr-1" />
                        ) : (
                          <MdColorLens className="h-3 w-3 mr-1" />
                        )}
                        {project.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>
                      {new Date(project.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loadProjectForEdit(project._id)}
                        >
                          <HiPencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(project._id)}
                        >
                          <HiTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
