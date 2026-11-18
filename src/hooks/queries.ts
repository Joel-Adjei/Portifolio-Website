import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ProjectInput, MessageInput } from "@/lib/api";

// Project Queries
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await api.getProjects();
      if (response.error) throw new Error(response.error);
      return response.data?.projects ?? [];
    },
  });
};

export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("Project ID is required");
      const response = await api.getProject(id);
      if (response.error) throw new Error(response.error);
      return response.data ?? null;
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProjectInput) => api.createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProjectInput }) =>
      api.updateProject(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Message Queries
export const useMessages = (enabled = true) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await api.getMessages();
      if (response.error) throw new Error(response.error);
      return response.data?.messages ?? [];
    },
    enabled,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageData: MessageInput) => api.sendMessage(messageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.markMessageAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

// Auth Queries
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.login(email, password),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.getMe();
      return response.data?.admin ?? null;
    },
    enabled,
  });
};
