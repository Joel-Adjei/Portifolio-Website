import { create } from 'zustand';

interface AdminState {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
