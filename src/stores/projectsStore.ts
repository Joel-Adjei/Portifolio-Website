import { create } from "zustand";
import { api, Project, ProjectInput } from "@/lib/api";

export type { Project };

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (payload: ProjectInput) => Promise<void>;
  updateProject: (id: string, payload: ProjectInput) => Promise<void>;
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
        set({ projects: response.data?.projects ?? [], loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch projects", loading: false });
    }
  },

  addProject: async (payload) => {
    try {
      const response = await api.createProject(payload);
      if (!response.error) {
        await get().fetchProjects();
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  },

  updateProject: async (id, payload) => {
    try {
      const response = await api.updateProject(id, payload);
      if (!response.error) {
        await get().fetchProjects();
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
          projects: state.projects.filter((p) => p.id !== id),
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
