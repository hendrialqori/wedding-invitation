import { GoDotFill } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { PiMapPin } from "react-icons/pi";
import { motion, Variants } from 'framer-motion'

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

const fadeIn: Variants = {
    initial: {
        opacity: 0,
        y: "40px",
    },
    animate: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            type: "spring",
            delay
        }
    })
}

const stagger: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.2,
            staggerChildren: 1,
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

export default function Event() {

    return (
        <section className="container-box2 mt-betweenSectionMd 
        xl:mt-betweenSection flex flex-col md:flex-row justify-between gap-14 md:gap-4" >
            <div>
                <motion.h2
                    className="heading-4 md:heading-3 xl:heading-2 font-dancing-script font-bold px-4 md:px-0"
                    {...anim(bluryEffect)}
                >
                    Wedding event
                </motion.h2>
                <div className="flex justify-start gap-x-2 md:gap-x-4 mt-betweenBoxMd xl:mt-betweenBox px-4 md:px-0">
                    <GoDotFill className="text-base md:text-lg lg:text-xl translate-y-1" />
                    <div className="space-y-4 md:space-y-6">
                        <motion.h4 className="text-base md:heading-4 font-dancing-script font-bold" {...anim(bluryEffect)}>Reseption</motion.h4>
                        <motion.ul className="space-y-3 md:space-y-4" {...anim(stagger)}>
                            <Li delay={0.2}>
                                <IoCalendarClearOutline className="text-xl md:text-2xl" />
                                <p className="text-xs md:text-base font-roboto-slab">September, 22 2024</p>
                            </Li>
                            <Li delay={0.4}>
                                <BsClock className="text-xl md:text-2xl" />
                                <p className="text-xs md:text-base font-roboto-slab">19:00 WIB - end</p>
                            </Li>
                            <Li delay={0.6}>
                                <PiMapPin className="text-2xl md:text-3xl -translate-x-1" />
                                <p className="text-xs md:text-base font-roboto-slab -translate-x-2">
                                    <span className="font-bold">Wisma Benteng Restaurant</span>
                                    <br />Jalan Kapten Maulana Lubis No 6
                                </p>
                            </Li>
                        </motion.ul>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-[630px] h-[389px] md:h-[320px] xl:h-[389px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5631.39973115063!2d98.67816612873084!3d3.5872587021008466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131cf0fa1607f%3A0x18c10c276bcb239b!2sWisma%20Benteng%20Restaurant!5e0!3m2!1sen!2sid!4v1721889409712!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </section >
    )
}


const Li = ({ delay, children }: { children: React.ReactNode, delay: number }) => {

    const variants: Variants = {
        initial: {
            opacity: 0,
            x: "-50px"
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                delay,
                type: "spring",
                bounce: 0
            }
        }
    }

    return (
        <motion.li className="flex items-start gap-4 md:gap-6" {...anim(variants)}>
            {children}
        </motion.li>
    )
}