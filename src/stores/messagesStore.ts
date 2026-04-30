import { create } from 'zustand';

export interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface MessagesState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [
    {
      id: '1',
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex@example.com',
      subject: 'Project collaboration',
      message:
        "Hi Joel, I came across your portfolio and I'm very impressed with your work. I'd love to discuss a potential collaboration on a web application project I'm working on.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah@designco.com',
      subject: 'UI/UX Design opportunity',
      message:
        "Hello! We're looking for a talented designer for our startup. Your portfolio caught our eye. Would you be available for a quick call this week?",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'mchen@techcorp.io',
      subject: 'Full-time frontend role',
      message:
        "Hi Joel, we have an exciting full-time frontend engineer position open at TechCorp. Your skills align perfectly with what we're looking for. Would love to connect.",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
  addMessage: (msg) =>
    set((state) => ({
      messages: [
        { ...msg, id: crypto.randomUUID(), date: new Date().toISOString(), read: false },
        ...state.messages,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
    })),
  deleteMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id),
    })),
}));
