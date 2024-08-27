import { create } from "zustand"

type State = {
    isOpen: boolean;
}

type Actions = {
    openInvitation: () => void
}

export const useInvitation = create<State & Actions>((set) => ({
    isOpen: false,
    openInvitation: () => set({ isOpen: true }),
}))