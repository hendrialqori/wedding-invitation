"use client";

import React from 'react';
import ButtonMusic from "./ButtonMusic";
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import("@/components/SmothScroll"), { ssr: false })

type ChildProps = {
    isOpen: boolean;
    onOpen: () => void
}

type Props = {
    children: (params: ChildProps) => React.ReactNode
}

export default function HomeWrapper({ children }: Props) {
    const audioRef = React.useRef<HTMLAudioElement | null>(null)
    let [isOpenInvitation, setIsOpenInvitation] = React.useState(false)
    let [isPlayMusic, setIsPlayMusic] = React.useState(false)

    function playMusic() {
        audioRef.current = new Audio("/audio/music.mp3")

        if (audioRef.current) {
            audioRef.current.onplay = function () {
                if (audioRef.current) {
                    audioRef.current.currentTime = 2
                }
            }

            audioRef.current.play()
            setIsPlayMusic(true)
        }
    }

    function enebleMusic() {
        if (audioRef.current) {
            audioRef.current.muted = false
            setIsPlayMusic(true)
        }
    }

    function disableMusic() {
        if (audioRef.current) {
            audioRef.current.muted = true
            setIsPlayMusic(false)
        }
    }

    function openInvitation() {
        setIsOpenInvitation(true)
        playMusic()
    }

    React.useEffect(() => {
        return () => {
            audioRef.current = null
        }
    }, [])

    return (
        <SmoothScroll>
            <ButtonMusic
                isPlayMusic={isPlayMusic}
                isOpenInvitation={isOpenInvitation}
                onPlay={enebleMusic}
                onMute={disableMusic}
            />
            {children({ isOpen: isOpenInvitation, onOpen: openInvitation })}
        </SmoothScroll>
    )
}
