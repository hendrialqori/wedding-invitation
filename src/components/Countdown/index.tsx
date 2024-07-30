import { Variants, motion } from "framer-motion";
import React from "react"

type Time = {
    days: number;
    hour: number;
    minute: number;
    second: number
}

const initialTime: Time = {
    days: 0,
    hour: 0,
    minute: 0,
    second: 0
}


const stagger: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.5,
            type: "spring"
        },
    }
}

const anim = (variants: Variants) => ({
    variants,
    initial: "initial",
    whileInView: "animate",
    viewport: {
        once: true
    }
})

export default function Countdown() {
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
    const [time, setTime] = React.useState<Time>(initialTime)

    const countdown = () => {
        const weddingDay = new Date("Sep 22, 2024 19:00:00").getTime()

        intervalRef.current = setInterval(() => {
            const now = new Date().getTime()
            const distance = weddingDay - now

            const days = Math.floor(distance / (24 * 60 * 60 * 1000))
            const hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
            const minute = Math.floor((distance % (1000 * 60 * 60)) / (60 * 1000))
            const second = Math.floor((distance % (60 * 1000)) / 1000)

            if (distance > 0) {
                setTime({ days, hour, minute, second })
            } else {
                setTime(initialTime)
                clearTimeout(intervalRef.current as NodeJS.Timeout)
            }

        }, 1000)

    }

    React.useEffect(() => {
        countdown()

        return () => {
            clearInterval(intervalRef.current as NodeJS.Timeout)
        }
    }, [])


    return (
        <section className="container-box2 mt-betweenSectionMd xl:mt-betweenSection py-14 xl:py-20">
            <motion.div
                className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-20 xl:gap-32"
                {...anim(stagger)}
            >
                <Li type="Days" value={time.days} delay={0.2} />
                <Li type="Hour" value={time.hour} delay={0.4}/>
                <Li type="Minutes" value={time.minute} delay={0.6}/>
                <Li type="Seconds" value={time.second} delay={0.8}/>
            </motion.div>
        </section>

    )
}


const Li = ({ type, value, delay }: { type: string, value: number, delay: number }) => {
    const variants: Variants = {
        initial: {
            opacity: 0,
            y: "50px",
            filter: "blur(10px)"
        },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0)",
            transition: {
                delay,
                type: "spring",
                bounce: 0
            }
        }
    }
    return (
        <motion.div className="flex flex-col items-center space-x-1" {...anim(variants)}>
            <h2 className="heading-3 xl:heading-2 font-roboto-slab">{value}</h2>
            <h4 className="text-base md:text-lg xl:heading-4 font-roboto-slab font-light ">{type}</h4>
        </motion.div>
    )
}