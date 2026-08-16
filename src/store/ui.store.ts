import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiState = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed })
    }),
    {
      name: 'iitil-ui',
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed })
    }
  )
);
