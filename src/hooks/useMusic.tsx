import React from "react"

export const useMusic = () => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    function play() {
        audioRef.current = new Audio("/audio/music.mp3")

        if (audioRef.current) {
            audioRef.current.onplay = function () {
                if (audioRef.current) {
                    audioRef.current.currentTime = 2
                }
            }

            audioRef.current.play()
        }
    }

    function unmute() {
        if (audioRef.current) {
            audioRef.current.muted = false
        }
    }

    function mute() {
        console.log("clicked")
        console.log(audioRef.current)
        if (audioRef.current) {
            audioRef.current.muted = true
        }
    }

    // React.useEffect(() => {
    //     return () => {
    //         audioRef.current = null
    //     }
    // }, [])


    return { play, mute, unmute }
}