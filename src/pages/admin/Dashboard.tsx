import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HiFolder,
  HiChatAlt2,
  HiMail,
  HiArrowRight,
  HiClock,
} from "react-icons/hi";
import { useProjects, useMessages } from "@/hooks/queries";
import { MdMessage } from "react-icons/md";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: projects = [] } = useProjects();
  const { data: messages = [] } = useMessages(true);
  const unread = messages.filter((m) => !m.read);
  const recentMessages = messages.slice(0, 5);

  const devProjects = projects.filter((p) => p.type === "development").length;
  const designProjects = projects.filter((p) => p.type === "design").length;

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      sub: `${devProjects} dev · ${designProjects} design`,
      icon: HiFolder,
      action: () => navigate("/admin/projects"),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Unread Messages",
      value: unread.length,
      sub: `${messages.length} total messages`,
      icon: HiMail,
      action: () => navigate("/admin/messages"),
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "All Messages",
      value: messages.length,
      sub: `${messages.length - unread.length} read`,
      icon: MdMessage,
      action: () => navigate("/admin/messages"),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Joel.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={stat.action}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-4xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.sub}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={() => navigate("/admin/projects")}
            >
              <span className="flex items-center gap-2">
                <HiFolder className="h-4 w-4" />
                Add New Project
              </span>
              <HiArrowRight className="h-4 w-4" />
            </Button>
            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={() => navigate("/admin/messages")}
            >
              <span className="flex items-center gap-2">
                <HiChatAlt2 className="h-4 w-4" />
                View Messages
                {unread.length > 0 && (
                  <Badge variant="destructive" className="text-xs h-5 px-1.5">
                    {unread.length}
                  </Badge>
                )}
              </span>
              <HiArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent messages preview */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Messages</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={() => navigate("/admin/messages")}
            >
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 cursor-pointer hover:bg-accent/50 -mx-2 px-2 py-1.5 rounded-md transition-colors"
                  onClick={() => navigate("/admin/messages")}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {msg.firstName[0]}
                    {msg.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm truncate ${!msg.read ? "font-semibold" : ""}`}
                      >
                        {msg.firstName} {msg.lastName}
                      </p>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {msg.subject}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects overview */}
      {projects.length > 0 && (
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Projects</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={() => navigate("/admin/projects")}
            >
              Manage all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projects.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        p.type === "development" ? "default" : "secondary"
                      }
                    >
                      {p.type}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <HiClock className="h-3 w-3" />
                      {new Date(p.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
