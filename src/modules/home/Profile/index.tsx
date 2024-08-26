"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import ProgressiveImage from "@/components/ProgressiveImage"
import MotionHeading from "@/components/Motion"

export default function Profile() {

    const variants: Variants = {
        initial: {
            opacity: 0,
            y: "40px",
        },
        animate: {
            opacity: 1,
            y: 0,
        }
    }

    const anim = ({ duration, delay }: { duration: number, delay: number }) => ({
        variants: variants,
        initial: "initial",
        whileInView: "animate",
        viewport: {
            once: true,
            margin: "-20%",
        },
        transition: {
            duration,
            type: "spring",
            delay
        }
    })

    return (
        <section className="container-box2 mt-24 md:mt-betweenSectionMd xl:mt-betweenSection grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-3 xl:gap-0">
            <div className="order-none md:order-1 flex flex-col justify-center items-center space-y-5 xl:space-y-7">
                <motion.div className="text-center space-y-5 md:space-y-7" {...anim({ duration: 1, delay: .2 })}>
                    <h3 className="heading-4 md:heading-3 font-dancing-script font-bold">
                        Kio Sato
                    </h3>
                    <div className="space-y-2">
                        <p className="text-xs md:text-sm font-roboto-slab">The youngest son of the couple</p>
                        <p className="text-sm md:text-base font-roboto-slab">Tn. Edward and Ny. Lui Lina Tan</p>
                    </div>
                </motion.div>
                <MotionHeading className="heading-4 md:heading-3 font-dancing-script font-bold"  {...anim({ duration: 1, delay: .3 })}>&</MotionHeading>
                <motion.div className="text-center space-y-5 md:space-y-7" {...anim({ duration: 1, delay: .4 })}>
                    <h3 className="heading-4 md:heading-3 font-dancing-script font-bold">
                        Christine
                    </h3>
                    <div className="space-y-2">
                        <p className="text-xs md:text-sm font-roboto-slab">First daughter of the couple</p>
                        <p className="text-sm md:text-base font-roboto-slab">Tn. Kalim Sentosa and Ny. Lely Yanti</p>
                    </div>
                </motion.div>
            </div>
            <div className="flex gap-x-5 lg:gap-x-9">
                <motion.div
                    className="w-[213px] h-[306px] md:h-[414px] xl:w-[287px] xl:h-[516px]"
                    {...anim({ duration: 1, delay: .2 })}
                >
                    <Image
                        src="/photos/kio.jpg"
                        alt="kio-photos"
                        width={500}
                        height={1000}
                        className="size-full object-cover"
                    />
                </motion.div>
                <motion.div
                    className="w-[213px] h-[306px] md:h-[414px] xl:w-[287px] xl:h-[516px] mt-20 md:mt-[155px]"
                    {...anim({ duration: 1, delay: .4 })}
                >
                    <Image
                        src="/photos/christine.jpg"
                        alt="christine-photos"
                        width={500}
                        height={1000}
                        className="size-full object-cover"
                    />
                </motion.div>
            </div>
        </section>
    )
}