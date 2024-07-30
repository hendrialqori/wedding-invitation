"use client";

import React from "react";
import Countdown from "@/components/Countdown";
import Event from "@/components/Event";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Profile from "@/components/Profile";
import Invitation from "@/components/Invitation";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const Footer =
  dynamic(() => import("@/components/Footer"), {
    ssr: false
  })

const SmoothScroll =
  dynamic(() => import("@/components/SmoothScroll"), {
    ssr: false
  })


export default function Content() {

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [isOpenInvitation, setIsOpenInvitation] = React.useState(false)

  const handleOpenInvitation = React.useCallback(() => {
    setIsOpenInvitation(true)

    audioRef.current = new Audio("/audio/music.mp3")

    audioRef.current.onplay = function () {
      if (audioRef.current) {
        audioRef.current.currentTime = 2
      }
    }

    audioRef.current.play()
    audioRef.current.loop = true

  }, [])

  React.useEffect(() => {
    return () => {
      audioRef.current = null
    }
  }, [])

  return (
    <SmoothScroll>
      <AnimatePresence>
        {!isOpenInvitation
          && <Invitation
            onOpenInvitation={handleOpenInvitation} />}
      </AnimatePresence>

      {isOpenInvitation && (
        <>
          <Hero />
          <Profile />
          <OurStory />
          <Gallery />
          <Event />
          <Countdown />
          <Footer />
        </>
      )}
    </SmoothScroll>
  );
}
