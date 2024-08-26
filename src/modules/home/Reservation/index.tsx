import { motion, type Variants } from "framer-motion"
import Form from "./Form"

const bluryEffect: Variants = {
    initial: {
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95
    },
    animate: {
        opacity: 1,
        filter: "blur(0)",
        scale: 1,
        transition: {
            duration: 1
        }
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

export default function Reservation() {
    return (
        <section className="container-box2 mt-24 md:mt-betweenSectionMd xl:mt-betweenSection py-14 xl:py-20">
            <motion.div
                className="space-y-4 md:space-y-5 text-center px-5 md:px-0"
                {...anim(bluryEffect)}
            >
                <h2 className="heading-4 md:heading-3 xl:heading-2 font-dancing-script">Reservation</h2>
            </motion.div>
            <Form />
        </section>
    )
}