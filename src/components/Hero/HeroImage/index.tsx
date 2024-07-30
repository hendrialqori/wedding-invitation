import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, Variants } from "framer-motion"
import Image from "next/image"
import React from "react"

export default function HeroImage() {

    const wrapper = React.useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: wrapper as unknown as React.RefObject<HTMLDivElement>,
        offset: ["start center", "center start"],

    })

    const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1])

    const variants: Variants = {
        initial: {
            opacity: 0,
            y: "40px"
        },
        animate: {
            opacity: 1,
            y: 0
        }
    }

    const anim = ({ duration, delay }: { duration: number, delay: number }) => ({
        variants: variants,
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true },
        transition: {
            duration,
            type: "spring",
            delay
        }
    })

    return (
        <div ref={wrapper} className="h-[200vh]">
            <motion.div
                id="image"
                className="w-full h-[332px] md:h-[570px] sticky top-[20dvh] xl:top-[10dvh]"
                style={{ scale }}
                {...anim({ duration: 1, delay: 0.3 })}
            >
                <Image
                    src="/photos/hero.jpg"
                    alt="hero-preweding"
                    width={1000}
                    height={600}
                    quality={100}
                    className="size-full object-cover"
                    priority
                />
            </motion.div>
        </div>
    )
}