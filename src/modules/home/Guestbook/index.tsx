import { motion, type Variants } from "framer-motion"
import Form from "./Form"
import Wishes from "./Wishes"

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


export default function Guestbook() {
    return (
        <section className="container-box2 mt-24 md:mt-betweenSectionMd xl:mt-betweenSection py-14 xl:py-20">
            <motion.div
                className="space-y-4 md:space-y-5 text-center px-5 md:px-0"
                {...anim(bluryEffect)}
            >
                <h2 className="heading-4 md:heading-3 xl:heading-2 font-dancing-script">Guestbook</h2>
                <p className="text-xs md:text-base font-roboto-slab">Your presence made our day, your words will stay forever</p>
            </motion.div>
            <div className="mt-10 max-w-xl mx-auto px-5 md:px-0">
                <Form />
                <Wishes />
            </div>
        </section>
    )
}