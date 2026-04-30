const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        return { error: errorData.message || `HTTP ${response.status}` };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async getMe() {
    return this.request("/auth/me", {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  // Project endpoints
  async getProjects() {
    return this.request("/projects");
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(formData: FormData) {
    return this.request("/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
  }

  async updateProject(id: string, formData: FormData) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
      body: formData,
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  // Message endpoints
  async sendMessage(messageData: {
    firstName: string;
    lastName: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    return this.request("/messages", {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  async getMessages() {
    return this.request("/messages", {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async markMessageAsRead(id: string) {
    return this.request(`/messages/${id}/read`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  async deleteMessage(id: string) {
    return this.request(`/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  private getToken(): string | null {
    return localStorage.getItem("adminToken");
  }
}

export const api = new ApiService(API_BASE_URL);
