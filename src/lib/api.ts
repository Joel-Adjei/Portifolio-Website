import { supabase } from "@/lib/supabase";

export type ProjectType = "development" | "design";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  type: ProjectType;
  date: string;
  client: string;
  image: string;
  images: string[];
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  behanceUrl: string | null;
  previewUrl: string | null;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;

export interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  date: string;
  createdAt: string;
}

export interface MessageInput {
  firstName: string;
  lastName: string;
  email: string;
  subject?: string;
  message: string;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  long_description: string;
  category: string;
  type: ProjectType;
  date: string | null;
  client: string;
  image: string;
  images: string[] | null;
  technologies: string[] | null;
  github_url: string | null;
  live_url: string | null;
  behance_url: string | null;
  preview_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

interface MessageRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

const PROJECT_IMAGES_BUCKET = "project-images";

const mapProject = (row: ProjectRow): Project => ({
  id: row.id,
  title: row.title,
  description: row.description,
  longDescription: row.long_description,
  category: row.category,
  type: row.type,
  date: row.date ?? "",
  client: row.client,
  image: row.image,
  images: row.images ?? [],
  technologies: row.technologies ?? [],
  githubUrl: row.github_url,
  liveUrl: row.live_url,
  behanceUrl: row.behance_url,
  previewUrl: row.preview_url,
  videoUrl: row.video_url,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapMessage = (row: MessageRow): Message => ({
  id: row.id,
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  subject: row.subject,
  message: row.message,
  read: row.read,
  date: row.created_at,
  createdAt: row.created_at,
});

const toProjectRow = (project: ProjectInput) => ({
  title: project.title,
  description: project.description ?? "",
  long_description: project.longDescription ?? "",
  category: project.category ?? "",
  type: project.type,
  date: project.date || null,
  client: project.client ?? "",
  image: project.image ?? "",
  images: project.images ?? [],
  technologies: project.technologies ?? [],
  github_url: project.githubUrl || null,
  live_url: project.liveUrl || null,
  behance_url: project.behanceUrl || null,
  preview_url: project.previewUrl || null,
  video_url: project.videoUrl || null,
});

class ApiService {
  // Auth
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    return { data: { user: data.user } };
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    return error ? { error: error.message } : { data: true };
  }

  async getMe() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return { error: "Not authenticated" };
    return { data: { admin: data.user } };
  }

  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return { error: error.message };
    return { data: { projects: (data as ProjectRow[]).map(mapProject) } };
  }

  async getProject(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return { error: error.message };
    if (!data) return { error: "Project not found" };
    return { data: mapProject(data as ProjectRow) };
  }

  async createProject(payload: ProjectInput) {
    const { data, error } = await supabase
      .from("projects")
      .insert(toProjectRow(payload))
      .select()
      .single();

    if (error) return { error: error.message };
    return { data: mapProject(data as ProjectRow) };
  }

  async updateProject(id: string, payload: ProjectInput) {
    const { data, error } = await supabase
      .from("projects")
      .update(toProjectRow(payload))
      .eq("id", id)
      .select()
      .single();

    if (error) return { error: error.message };
    return { data: mapProject(data as ProjectRow) };
  }

  async deleteProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    return error ? { error: error.message } : { data: true };
  }

  async uploadImage(file: File) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const path = `${crypto.randomUUID()}.${extension}`;

    const { error } = await supabase.storage
      .from(PROJECT_IMAGES_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) return { error: error.message };

    const { data } = supabase.storage
      .from(PROJECT_IMAGES_BUCKET)
      .getPublicUrl(path);

    return { data: { url: data.publicUrl } };
  }

  // Messages
  async sendMessage(message: MessageInput) {
    const { error } = await supabase.from("messages").insert({
      first_name: message.firstName,
      last_name: message.lastName ?? "",
      email: message.email,
      subject: message.subject ?? "",
      message: message.message,
    });

    return error ? { error: error.message } : { data: true };
  }

  async getMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return { error: error.message };
    return { data: { messages: (data as MessageRow[]).map(mapMessage) } };
  }

  async markMessageAsRead(id: string) {
    const { data, error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", id)
      .select()
      .single();

    if (error) return { error: error.message };
    return { data: mapMessage(data as MessageRow) };
  }

  async deleteMessage(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    return error ? { error: error.message } : { data: true };
  }
}

export const api = new ApiService();
