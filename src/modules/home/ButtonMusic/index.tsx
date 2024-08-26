"use client"

import { useMusic } from "@/hooks/useMusic";
import { useInvitation } from "@/store/useInvitation";
import React from "react";
import { GiSoundOff } from "react-icons/gi";
import { GiSoundOn } from "react-icons/gi";

export default function ButtonMusic() {
    const invitation = useInvitation()
    const music = useMusic()

    const musicAction = invitation.isPlayMusic ? music.mute : music.unmute

    return (
        <button
            className="size-8 rounded-full fixed right-4 top-4 border border-black p-1 z-10 bg-ivory"
            style={{ opacity: invitation.isOpen ? 1 : 0 }}
            onClick={music.mute}
        >
            {!invitation.isPlayMusic
                ? <GiSoundOn className="text-2xl" />
                : <GiSoundOff className="text-2xl" />}
        </button>
    )
}