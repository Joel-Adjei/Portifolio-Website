import { create } from 'zustand';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  date: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
  behance_url?: string;
  preview_url?: string;
  client?: string;
  long_description?: string;
  image_url?: string;
}

interface ProjectsState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        { ...project, id: crypto.randomUUID() },
      ],
    })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updatedProject } : p
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
}));
