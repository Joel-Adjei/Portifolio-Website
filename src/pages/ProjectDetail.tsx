import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Calendar, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {projectDetails} from "@/data/project-details";
import { useEffect } from "react";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const project = projectDetails[id || "1"];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Portfolio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="smooth-transition hover:glow-effect hover:bg-gray-700/30 hover:border border-blue-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-7">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 slide-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  {project.category}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.type === 'development' ? (
                  <>
                    <Button size="lg" className="glow-effect group" onClick={() => window.open(project.liveUrl, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Site
                    </Button>
                    <Button variant="outline" size="lg" className="smooth-transition hover:glow-effect" onClick={() => window.open(project.githubUrl, '_blank')}>
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="glow-effect group" onClick={() => window.open(project.behanceUrl, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Behance
                    </Button>
                    <Button variant="outline" size="lg" className="smooth-transition hover:glow-effect" onClick={() => window.open(project.previewUrl, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Preview
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="relative fade-in" style={{ animationDelay: '0.3s' }}>
              <Card className="overflow-hidden border-2 border-primary/20 glow-effect">
                <div className="aspect-video relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Project Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4 skill-card">
                <h3 className="text-xl font-semibold">Project Details</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Client:</span>
                    <span>{project.client}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 skill-card">
                <h3 className="text-xl font-semibold">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6 space-y-4 skill-card">
                <h3 className="text-xl font-semibold">Links</h3>
                <div className="space-y-2">
                  {project.type === 'development' ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(project.behanceUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Behance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(project.previewUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Preview
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;