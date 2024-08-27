"use client";

import React from "react";
import Image from "next/image"
import { AnimatePresence } from "framer-motion";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { RiArrowDownWideLine } from "react-icons/ri"
import { motion, type Variants } from 'framer-motion'
import { useInvitation } from "@/store/useInvitation";
import { useMusic } from "@/hooks/useMusic";

const variants: Variants = {
    initial: {
        opacity: 1,
        y: 0
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: "40px"
    }
}

const anim = ({ delay }: { delay: number }) => ({
    variants: variants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: {
        duration: 0.8,
        type: "spring",
        delay
    }
})

export default function Invitation() {
    const invitation = useInvitation()

    return (
        <AnimatePresence initial={false} mode="wait">
            {!invitation.isOpen &&
                <Card />}
        </AnimatePresence>
    )
}

function Card() {
    const invitation = useInvitation()

    function openInvitation() {
        invitation.openInvitation()
    }

    React.useEffect(() => {
        const html = document.querySelector("html") as HTMLHtmlElement

        if (html) {
            html.style.overflow = "hidden"
        }

        return () => {
            if (html) {
                html.style.overflow = "visible"
            }
        }

    }, [])


    // hidden scroll y body
    useLockBodyScroll()

    return (
        <div className="fixed inset-0 z-[100] bg-ivory">
            <section
                className="min-h-dvh max-w-[2650px] mx-auto bg-ivory flex flex-col md:flex-row justify-between overflow-hidden">
                <motion.div
                    className="px-7 md:px-14 py-7 w-full xl:w-5/12 space-y-6"
                    {...anim({ delay: 0 })}
                >
                    <div className="space-y-4">
                        <div className="-space-y-3">
                            <h3 className="heading-3 font-roboto-slab">22</h3>
                            <h3 className="heading-3 font-roboto-slab">09</h3>
                            <h3 className="heading-3 font-roboto-slab">24</h3>
                        </div>
                        <div className="w-[1.5px] bg-black h-36 ml-5" />
                        <h2 className="heading-3 xl:heading-2 font-bold font-dancing-script">
                            Kio & <br />Christine
                        </h2>
                    </div>
                    {/* <div className="font-roboto-slab">
                    <p className="text-sm">Special invitation to</p>
                    <p className="font-medium">{inviteFor ?? "-"}</p>
                </div> */}
                    <div className="flex justify-start md:justify-center items-center pt-4">
                        <button onClick={openInvitation} className="group">
                            <div className="flex flex-col justify-center items-center border border-black rounded-lg px-4 py-2 pb-1 -space-y-1">
                                <p className="font-roboto-slab text-sm">Open Invitation</p>
                                <RiArrowDownWideLine className="text-3xl group-hover:translate-y-1 group-active:scale-75 transition duration-300" />
                            </div>
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    className="w-full h-screen"
                    {...anim({ delay: 0.1 })}
                >
                    <Image
                        src="/photos/hero.jpg"
                        alt="hero-photos"
                        width={1000}
                        height={1000}
                        quality={100}
                        priority
                        className="size-full object-cover"
                    />
                </motion.div>
            </section >
        </div>

    )
}


// const search = useSearchParams()
// const inviteFor = (search.get("to"))P
