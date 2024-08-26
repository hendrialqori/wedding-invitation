import React from "react";
import { GiSoundOff } from "react-icons/gi";
import { GiSoundOn } from "react-icons/gi";

type Props = {
    isPlayMusic: boolean
    isOpenInvitation: boolean
    onPlay: () => void;
    onMute: () => void
}

export default function ButtonMusic({ isPlayMusic, isOpenInvitation, onPlay, onMute }: Props) {
    const musicHandler = isPlayMusic ? onMute : onPlay
    return (
        <button
            className="size-8 rounded-full fixed right-4 top-4 border border-black p-1 z-10 bg-ivory"
            style={{ opacity: isOpenInvitation ? 1 : 0 }}
            onClick={musicHandler}
        >
            {isPlayMusic
                ? <GiSoundOn className="text-2xl" />
                : <GiSoundOff className="text-2xl" />}
        </button>
    )
}