import { create } from "zustand";
import { api, Message } from "@/lib/api";

export type { Message };

interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (
    message: Omit<Message, "id" | "date" | "read" | "createdAt">,
  ) => void;
  markAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getMessages();
      if (response.error) {
        set({ error: response.error, loading: false });
      } else {
        set({ messages: response.data?.messages ?? [], loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch messages", loading: false });
    }
  },

  addMessage: (msg) =>
    set((state) => {
      const now = new Date().toISOString();
      return {
        messages: [
          {
            ...msg,
            id: crypto.randomUUID(),
            date: now,
            createdAt: now,
            read: false,
          },
          ...state.messages,
        ],
      };
    }),

  markAsRead: async (id) => {
    try {
      const response = await api.markMessageAsRead(id);
      if (!response.error) {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, read: true } : m,
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  },

  deleteMessage: async (id) => {
    try {
      const response = await api.deleteMessage(id);
      if (!response.error) {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        }));
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  },
}));
