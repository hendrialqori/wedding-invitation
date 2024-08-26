import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import { twMerge } from 'tailwind-merge'
import ModalGallery from "./ModalGallery"
import React from "react"

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

const images = [
    "/photos/gallery-1.jpg",
    "/photos/gallery-2.jpg",
    "/photos/gallery-3.jpg",
    "/photos/gallery-4.jpg",
    "/photos/gallery-5.jpg",
    "/photos/gallery-6.jpg",
    "/photos/gallery-7.jpg",
    "/photos/gallery-8.jpg",
    "/photos/gallery-9.jpg",
    "/photos/gallery-10.jpg",
    "/photos/gallery-11.jpg",
    "/photos/gallery-12.jpg",
    "/photos/gallery-13.jpg"

]

export default function Gallery() {

    let [isOpen, setOpen] = React.useState(false)
    let [currentIndex, setCurrentIndex] = React.useState<number>(0)
    let [direction, setDirection] = React.useState(0)

    function prev() {
        setCurrentIndex(prevIndex => {
            return prevIndex <= 0 ? images.length - 1 : prevIndex - 1;
        });
        setDirection(-1)
    }

    function next() {
        setCurrentIndex(prevIndex => {
            return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        });
        setDirection(1)
    }

    function selectImage(index: number) {
        return function () {
            setCurrentIndex(index)
            setOpen(true)
        }
    }

    function closeModal() { setOpen(false) }

    return (
        <section className="bg-black mt-betweenSectionMd xl:mt-betweenSection">
            <div className="container-box2 grid grid-cols-1 xl:grid-cols-3 items-start py-9 md:py-24 xl:py-[7.375rem] border-white gap-y-14 md:gap-y-24">
                <div className="col-span-2 flex justify-center items-center gap-3 md:gap-6 order-1 xl:order-none">
                    <Column>
                        <Photo imageSrc={images[0]} delay={0} onClick={selectImage(0)} />
                        <Photo imageSrc={images[2]} delay={0.2} onClick={selectImage(2)} />
                        <Photo imageSrc={images[4]} delay={0.2} onClick={selectImage(4)} />
                        <Photo imageSrc={images[6]} delay={0.2} onClick={selectImage(6)} />
                        <Photo imageSrc={images[8]} delay={0.2} onClick={selectImage(8)} />
                        <Photo imageSrc={images[10]} delay={0.2} onClick={selectImage(10)} objectPosition="object-left"/>
                        <Photo imageSrc={images[12]} delay={0.2} onClick={selectImage(12)} />


                    </Column>
                    <Column className="mt-20 xl:mt-[9.5625rem]">
                        <Photo imageSrc={images[1]} delay={0.2} onClick={selectImage(1)} />
                        <Photo imageSrc={images[3]} delay={0.4} onClick={selectImage(3)} />
                        <Photo imageSrc={images[5]} delay={0.4} onClick={selectImage(5)} />
                        <Photo imageSrc={images[7]} delay={0.4} onClick={selectImage(7)} />
                        <Photo imageSrc={images[9]} delay={0.4} onClick={selectImage(9)} objectPosition="object-left" />
                        <Photo imageSrc={images[11]} delay={0.4} onClick={selectImage(11)} />
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
            <ModalGallery
                isOpen={isOpen}
                image={images[currentIndex]}
                direction={direction}
                onPrev={prev}
                onNext={next}
                onClose={closeModal}
            />
        </section>
    )
}


const Column = ({ children, className, ...rest }: React.ComponentProps<'div'>) => {

    const classMerge = twMerge(
        "flex flex-col gap-3 md:gap-6", className
    )

    return (
        <div className={classMerge} {...rest}>
            {children}
        </div>
    )
}


const Photo = ({ imageSrc, delay, objectPosition = "", onClick }:
    { imageSrc: string, delay: number, objectPosition?: string, onClick: () => void }
) => {
    return (
        <motion.div
            className="w-full h-[200px] xl:w-[322px] xl:h-[427px] cursor-pointer"
            {...anim(fadeIn)}
            custom={delay}
            onClick={onClick}
        >
            <Image
                src={imageSrc}
                alt="photo-frame"
                width={1000}
                height={1500}
                quality={100}
                className={`size-full object-cover ${objectPosition}`}
            />
        </motion.div>
    )
}