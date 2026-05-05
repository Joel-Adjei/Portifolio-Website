import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
  HiPlus,
  HiX,
} from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "@/hooks/queries";

interface ProjectsAdminProps {
  isEdit?: boolean;
}

export default function ProjectsAdmin({ isEdit = false }: ProjectsAdminProps) {
  const { addProject, updateProject } = useProjectsStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  // Fetch project data if in edit mode
  const { data: existingProject, isLoading: projectLoading } = useProject(
    id || "",
  );

  // Populate form with existing data when in edit mode
  useEffect(() => {
    if (isEdit && existingProject) {
      setType(existingProject.type);
      setTitle(existingProject.title);
      setDescription(existingProject.description);
      setLongDescription(existingProject.longDescription);
      setCategory(existingProject.category);
      setDate(existingProject.date);
      setClient(existingProject.client);
      setTechnologies(existingProject.technologies);
      setImageUrl(existingProject.image);
      setAdditionalImageUrls(existingProject.images || []);
      setGithubUrl(existingProject.githubUrl || "");
      setLiveUrl(existingProject.liveUrl || "");
      setBehanceUrl(existingProject.behanceUrl || "");
      setPreviewUrl(existingProject.previewUrl || "");
      setVideoUrl(existingProject.videoUrl || "");
    }
  }, [isEdit, existingProject]);

  const { mutateAsync: submitImage } = useMutation({
    mutationFn: async () => {
      try {
        let uploadedImgs: any[] = [];

        for (let i = 0; i < (imageInput?.length || 0); i++) {
          const formData = new FormData();
          formData.append("file", imageInput![i]);
          formData.append("upload_preset", uploadPreset);
          formData.append("cloud_name", cloudName);
          const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          uploadedImgs.push(data);
        }
        console.log(imageInput);
        console.log(uploadedImgs);
        setAdditionalImageUrls(uploadedImgs.map((img) => img.secure_url));
        return;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload additional images",
          variant: "destructive",
        });
        throw new Error("Failed to upload additional images");
      }
    },
  });

  const { mutateAsync: submitCoverImage } = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData();
        formData.append("file", coverImg);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setImageUrl(data.secure_url);

        console.log(imageInput);
        return;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload cover image",
          variant: "destructive",
        });
        throw new Error("Failed to upload cover image");
      }
    },
  });

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
  const [imageUrl, setImageUrl] = useState("");
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [behanceUrl, setBehanceUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageInput, setImageInput] = useState<FileList | null>(null);
  const [coverImg, setCoverImg] = useState<File | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setClient("");
    setTechnologies([]);
    setTechInput("");
    setImageUrl("");
    setAdditionalImageUrls([]);
    setGithubUrl("");
    setLiveUrl("");
    setBehanceUrl("");
    setPreviewUrl("");
    setVideoUrl("");
    setType("development");
    setImageInput(null);
    setCoverImg(null);
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

  const handleRemoveAdditionalImage = (index: number) => {
    setImageInput((prev) => {
      if (!prev) return null;
      const files = Array.from(prev);
      files.splice(index, 1);
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      return dataTransfer.files;
    });
  };

  const handleSubmit = async () => {
    // if (!title || !description || !category || !imageUrl) {
    //   toast({
    //     title: "Error",
    //     description: "Please fill in all required fields",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setSubmitting(true);

    try {
      await submitCoverImage();
      await submitImage();
      const payload = {
        title,
        description,
        longDescription,
        category,
        type,
        date,
        client,
        technologies,
        image: imageUrl,
        images: additionalImageUrls,
        githubUrl,
        liveUrl,
        behanceUrl,
        previewUrl,
        videoUrl,
      };

      if (isEdit && id) {
        await updateProject(id, payload);
        toast({ title: "Success", description: "Project updated!" });
        navigate("/admin/projects");
      } else {
        await addProject(payload);
        toast({ title: "Success", description: "Project added!" });
        resetForm();
      }
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

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/projects")}
          className="mb-4"
        >
          <BsArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>

      {isEdit && projectLoading ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading project...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isEdit ? (
                <>
                  <HiCode className="h-5 w-5" />
                  Edit Project
                </>
              ) : (
                <>
                  <HiPlus className="h-5 w-5" />
                  Create New Project
                </>
              )}
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
            <div className=" gap-6">
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
                  <Label htmlFor="longDescription">Project Overview *</Label>
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
                          <SelectItem value="illustration">
                            Illustration
                          </SelectItem>
                          <SelectItem value="graphic">
                            Graphic Design
                          </SelectItem>
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
                  <Label htmlFor="coverImage">Cover Image *</Label>
                  <label
                    htmlFor="coverImage"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center transition hover:border-primary"
                  >
                    <Input
                      id="coverImage"
                      type="file"
                      className="hidden"
                      onChange={(e) => setCoverImg(e.target.files?.[0] || null)}
                      accept="image/*"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {coverImg ? coverImg.name : "Choose a cover image"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </label>

                  {isEdit && (
                    <div>
                      <p className="text-sm p-1">Previous image</p>
                      <img
                        src={imageUrl}
                        className="h-40 w-50 object-contain rounded-md"
                      />
                    </div>
                  )}
                  {coverImg && (
                    <div className="relative mt-3 overflow-hidden rounded-xl border border-border bg-slate-950/5">
                      {isEdit && <p className="text-sm p-4">New image</p>}
                      <img
                        src={URL.createObjectURL(coverImg)}
                        className="h-40 w-full object-contain"
                        alt="Cover preview"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-2 top-2 rounded-full p-2"
                        onClick={() => setCoverImg(null)}
                      >
                        <HiX className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalImages">Additional Images</Label>
                  <label
                    htmlFor="additionalImages"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center transition hover:border-primary"
                  >
                    <Input
                      id="additionalImages"
                      type="file"
                      className="hidden"
                      onChange={(e) => setImageInput(e.target.files || null)}
                      accept="image/*"
                      multiple
                    />
                    <span className="text-sm font-medium text-foreground">
                      {imageInput?.length
                        ? `${imageInput.length} image${imageInput.length === 1 ? "" : "s"} selected`
                        : "Select one or more images"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Preview selected images below
                    </span>
                  </label>

                  {isEdit && (
                    <>
                      <p className="text-sm p-1">Previous image</p>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {additionalImageUrls.map((url, index) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border border-border"
                          >
                            <img
                              src={url}
                              className="h-28 w-full object-contain"
                              alt={`Preview ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {isEdit && imageInput && (
                    <div>
                      <p className="text-sm p-1">new image</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {Array.from(imageInput || []).map((file, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-border"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          className="h-28 w-full object-contain"
                          alt={`Preview ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAdditionalImage(index)}
                          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-destructive hover:text-white"
                        >
                          <HiX className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
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
                    <Button
                      type="button"
                      onClick={handleAddTechnology}
                      size="icon"
                    >
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
                      <Label
                        htmlFor="liveUrl"
                        className="flex items-center gap-2"
                      >
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
                  : isEdit
                    ? "Update Project"
                    : "Create Project"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
