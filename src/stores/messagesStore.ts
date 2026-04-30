import { create } from "zustand";
import { api } from "@/lib/api";

export interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  createdAt: string;
}

interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  addMessage: (
    message: Omit<Message, "_id" | "date" | "read" | "createdAt">,
  ) => void;
  markAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
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
        const messages = response.data!.messages.map((msg: any) => ({
          ...msg,
          id: msg._id,
          date: msg.createdAt,
        }));
        set({ messages, loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch messages", loading: false });
    }
  },

  addMessage: (msg) =>
    set((state) => ({
      messages: [
        {
          ...msg,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          read: false,
        },
        ...state.messages,
      ],
    })),

  markAsRead: async (id) => {
    try {
      const response = await api.markMessageAsRead(id);
      if (!response.error) {
        set((state) => ({
          messages: state.messages.map((m) =>
            m._id === id ? { ...m, read: true } : m,
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
          messages: state.messages.filter((m) => m._id !== id),
        }));
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  },
}));
