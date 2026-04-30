import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HiStar, HiCalendar, HiExternalLink } from "react-icons/hi";
import { FaAward, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect } from "react";

const Achievements = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver();

  const achievements = [
    {
      id: 1,
      title: "Full Stack Developer Certification",
      organization: "Tech Academy",
      date: "2023",
      description:
        "Comprehensive certification covering modern web development technologies including React, Node.js, and cloud deployment.",
      type: "Certification",
      icon: FaAward,
      skills: ["React", "Node.js", "MongoDB", "AWS"],
    },
    {
      id: 2,
      title: "Best Innovation Award",
      organization: "DevCon 2023",
      date: "2023",
      description:
        "Recognized for developing an AI-powered task management solution that increased team productivity by 40%.",
      type: "Award",
      icon: FaTrophy,
      skills: ["AI", "Machine Learning", "React", "Python"],
    },
    {
      id: 3,
      title: "Open Source Contributor",
      organization: "GitHub",
      date: "2022-Present",
      description:
        "Active contributor to various open source projects with over 500+ commits and 50+ pull requests merged.",
      type: "Recognition",
      icon: HiStar,
      skills: ["Git", "JavaScript", "TypeScript", "React"],
    },
    {
      id: 4,
      title: "Advanced React Developer",
      organization: "React Training",
      date: "2022",
      description:
        "Advanced certification in React ecosystem including hooks, context, performance optimization, and testing.",
      type: "Certification",
      icon: FaAward,
      skills: ["React", "Redux", "Testing", "Performance"],
    },
    {
      id: 5,
      title: "Hackathon Winner",
      organization: "Code Challenge 2022",
      date: "2022",
      description:
        "First place winner in 48-hour hackathon for creating a sustainable energy monitoring dashboard.",
      type: "Award",
      icon: FaTrophy,
      skills: ["Vue.js", "D3.js", "IoT", "Real-time Data"],
    },
    {
      id: 6,
      title: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      date: "2021",
      description:
        "Foundational certification in cloud computing concepts, AWS services, and cloud architecture best practices.",
      type: "Certification",
      icon: FaAward,
      skills: ["AWS", "Cloud Computing", "DevOps", "Security"],
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "Award":
        return FaTrophy;
      case "Certification":
        return FaAward;
      case "Recognition":
        return HiStar;
      default:
        return FaAward;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Award":
        return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case "Certification":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Recognition":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      default:
        return "bg-gradient-to-r from-primary to-accent";
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 hero-text">
            Achievements & Certifications
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my professional accomplishments, certifications, and
            recognitions that demonstrate my commitment to continuous learning
            and excellence in software development.
          </p>
        </div>
      </section>

      {/* Achievements Grid */}
      <section
        ref={elementRef}
        className={`py-20 section-fade-in ${isVisible ? "visible" : ""}`}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = getIcon(achievement.type);
              return (
                <Card
                  key={achievement.id}
                  className="skill-card group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${getTypeColor(
                          achievement.type,
                        )} text-white`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary smooth-transition">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HiCalendar className="h-4 w-4" />
                      <span>{achievement.date}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm font-medium text-primary">
                      {achievement.organization}
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {achievement.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 hero-text">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            These achievements represent my dedication to excellence and
            continuous learning. Let's discuss how I can bring this expertise to
            your next project.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/#contact")}
              className="smooth-transition hover:glow-effect"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              className="smooth-transition hover:accent-glow"
            >
              <HiExternalLink className="h-4 w-4 mr-2" />
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
