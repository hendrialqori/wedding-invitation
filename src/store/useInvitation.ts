import { create } from "zustand"

type State = {
    isOpen: boolean;
    isPlayMusic: boolean
}

type Actions = {
    openInvitation: () => void
    playMusic: () => void
}

export const useInvitation = create<State & Actions>((set) => ({
    isOpen: false,
    isPlayMusic: false,
    openInvitation: () => set({ isOpen: true }),
    playMusic: () => set({ isPlayMusic: true })
}))