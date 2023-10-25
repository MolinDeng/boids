import { create } from 'zustand';

interface PauseState {
  paused: boolean;
  setPaused: (p: boolean) => void;
  flipPaused: () => void;
}

export const useRenderPause = create<PauseState>()((set) => ({
  paused: false,
  setPaused: (p) => set((state) => ({ paused: p })),
  flipPaused: () => set((state) => ({ paused: !state.paused })),
}));
