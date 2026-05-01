import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import RootLayout from "./components/layout/RootLayout";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsPage from "./pages/admin/Projects";
import CreateProject from "./pages/admin/CreateProject";
import MessagesPage from "./pages/admin/Messages";
// import BlogPage from "./pages/Blog";
// import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Index />} />
            <Route path="project/:id" element={<ProjectDetail />} />
            <Route path="projects" element={<AllProjects />} />
            <Route path="auth" element={<Auth />} />
            {/* <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogPost />} /> */}
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/create" element={<CreateProject />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
