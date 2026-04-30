import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HiCode, HiExternalLink, HiEye, HiSparkles, HiDesktopComputer } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { icons, objects } from "@/assets/assets";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="skill-card group overflow-hidden border-border/50 cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 p-0"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 flex gap-2 items-center">
          <Badge
            variant={
              project.category == "development" ? "default" : "secondary"
            }
            className="font-medium shadow-lg backdrop-blur-sm"
          >
            {project.category === "development" ? (
              <>
                Development
                <img src={icons.code} className="w-3.5 h-3.5 ml-1.5" />
              </>
            ) : (
              <>
                Design
                <img src={objects.design3d} className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </Badge>
        </div>

        <div className="absolute top-1 left-2 flex gap-2 pt-2">
          {project.category === "development" ? (
            <Button
              variant="outline"
              size="sm"
              className="transition-all duration-300 hover:bg-accent/10"
            >
              <FaGithub className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="transition-all duration-300 hover:bg-accent/10"
            >
              <HiExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech: string) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-mono backdrop-blur-sm bg-background/80"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge variant="outline" className="text-xs font-medium">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-1.5 pt-3">
        <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
          {project.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
