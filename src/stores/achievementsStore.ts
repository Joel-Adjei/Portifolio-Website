import { create } from 'zustand';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: string;
  organization: string;
  date: string;
  skills?: string[];
}

interface AchievementsState {
  achievements: Achievement[];
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
}

export const useAchievementsStore = create<AchievementsState>((set) => ({
  achievements: [],
  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [
        ...state.achievements,
        { ...achievement, id: crypto.randomUUID() },
      ],
    })),
  updateAchievement: (id, updatedAchievement) =>
    set((state) => ({
      achievements: state.achievements.map((a) =>
        a.id === id ? { ...a, ...updatedAchievement } : a
      ),
    })),
  deleteAchievement: (id) =>
    set((state) => ({
      achievements: state.achievements.filter((a) => a.id !== id),
    })),
}));
