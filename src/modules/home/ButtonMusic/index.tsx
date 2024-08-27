"use client"

import { useMusic } from "@/hooks/useMusic";
import { useInvitation } from "@/store/useInvitation";

export default function ButtonMusic() {
  
    const invitation = useInvitation()

    const musicRef = React.useRef<HTMLAudioElement | null>(null)
    const [isPlay, setPlay] = React.useState(true)

    function play() {
        if (musicRef.current) {
            musicRef.current.onplay = function () {
                if (musicRef.current) {
                    musicRef.current.currentTime = 2
                }
            }

            musicRef.current.play()

        }
    }

    function unmute() {
        if (musicRef.current) {
            musicRef.current.muted = false
            setPlay(true)
        }
    }

    function mute() {
        if (musicRef.current) {
            musicRef.current.muted = true
            setPlay(false)
        }
    }

    React.useEffect(() => {
        if (invitation.isOpen) {
            play()
        }

    }, [invitation.isOpen])


    const musicAction = isPlay ? mute : unmute

    return (
        <div>
            <button
                className="size-8 rounded-full fixed right-4 top-4 border border-black p-1 z-[10] bg-ivory"
                style={{ opacity: invitation.isOpen ? 1 : 0 }}
                onClick={musicAction}
            >
                {isPlay
                    ? <GiSoundOn className="text-2xl" />
                    : <GiSoundOff className="text-2xl" />}
            </button>
            <audio ref={musicRef} src="/audio/music.mp3" className="hidden" />
        </div>
    )
}