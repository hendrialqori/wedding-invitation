import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { twMerge } from 'tailwind-merge'

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

const anim = (variants: Variants) => ({
    variants,
    initial: "initial",
    whileInView: "animate",
    viewport: {
        once: true
    }
})

export default function Gallery() {


    return (
        <section className="bg-black mt-betweenSectionMd xl:mt-betweenSection">
            <div className="container-box2 grid grid-cols-1 xl:grid-cols-3 items-start py-9 md:py-24 xl:py-[7.375rem] border-white gap-y-14 md:gap-y-24">
                <div className="xl:col-span-2 flex flex-col md:flex-row gap-0 md:gap-6 order-1 xl:order-none">
                    <Column>
                        <Photo imageSrc="/photos/gallery-1.jpg" delay={0} />
                        <Photo imageSrc="/photos/gallery-3.jpg" delay={0.4}/>
                        <Photo imageSrc="/photos/gallery-5.jpg" delay={1}/>

                    </Column>
                    <Column className="mt-0 xl:mt-[9.5625rem]">
                        <Photo imageSrc="/photos/gallery-2.jpg" delay={0.2}/>
                        <Photo imageSrc="/photos/gallery-4.jpg" delay={0.6}/>
                        <Photo imageSrc="/photos/gallery-6.jpg" delay={0.8}/>
                    </Column>
                </div>
                <motion.div
                    className="space-y-4 md:space-y-5 relative xl:sticky xl:top-[7.375rem] text-center px-5 md:px-0"
                    {...anim(bluryEffect)}
                >
                    <h2 className="heading-4 md:heading-3 xl:heading-2 font-dancing-script text-white">Our Gallery</h2>
                    <p className="text-xs md:text-base font-roboto-slab text-white">A showcase of our most beautiful prewedding moments</p>
                </motion.div>
            </div>

        </section>
    )
}


const Column = ({ children, className, ...rest }: React.ComponentProps<'div'>) => {

    const classMerge = twMerge(
        "flex flex-col gap-0 md:gap-6", className
    )

    return (
        <div className={classMerge} {...rest}>
            {children}
        </div>
    )
}


const Photo = ({ imageSrc, delay }: { imageSrc: string, delay: number }) => {
    return (
        <motion.div className="w-full xl:w-[322px] h-[427px]" {...anim(fadeIn)} custom={delay}>
            <Image
                src={imageSrc}
                alt="photo-frame"
                width={1000}
                height={1500}
                quality={100}
                className="size-full object-cover"
            />
        </motion.div>
    )
}