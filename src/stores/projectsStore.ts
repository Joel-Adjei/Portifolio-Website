import { create } from "zustand";
import { api } from "@/lib/api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  videoUrl?: string;
  technologies: string[];
  date: string;
  client: string;
  category: string;
  type: string;
  githubUrl?: string;
  liveUrl?: string;
  behanceUrl?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (formData: FormData) => Promise<void>;
  updateProject: (id: string, formData: FormData) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getProjects();
      if (response.error) {
        set({ error: response.error, loading: false });
      } else {
        set({ projects: response.data!.projects, loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch projects", loading: false });
    }
  },

  addProject: async (formData) => {
    try {
      const response = await api.createProject(formData);
      if (!response.error) {
        await get().fetchProjects(); // Refresh the list
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  },

  updateProject: async (id, formData) => {
    try {
      const response = await api.updateProject(id, formData);
      if (!response.error) {
        await get().fetchProjects(); // Refresh the list
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await api.deleteProject(id);
      if (!response.error) {
        set((state) => ({
          projects: state.projects.filter((p) => p._id !== id),
        }));
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }
  },
}));
