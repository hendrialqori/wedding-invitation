import Image from "next/image";
import { AnimatePresence, Variants, motion } from "framer-motion"
import { IoMdClose } from "react-icons/io";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

type Props = {
    isOpen: boolean
    image: string
    direction: number
    onPrev: () => void
    onNext: () => void
    onClose: () => void
}

const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "50%" : "-50%",
        scale: 0.8,
        zIndex: 0,
        opacity: 0
    }),
    center: {
        x: 0,
        scale: 1,
        zIndex: 1,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "50%" : "-50%",
        scale: 0.8,
        zIndex: 0,
        opacity: 0
    })
}


export default function ModalGallery({ isOpen, image, direction, onPrev, onNext, onClose }: Props) {
    if (isOpen)
        return (
            <div className="fixed inset-0 bg-black/70 z-20 flex items-center justify-center" role="modal">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <IoMdClose className="text-2xl text-white" />
                </button>
                <div className="relative h-[80dvh] w-[90%] md:w-[80%]">
                    <button className="absolute top-1/2 -translate-y-1/2 bg-black/50 p-1 z-10" onClick={onPrev}>
                        <GrFormPrevious className="text-2xl md:text-3xl xl:text-4xl text-white" />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 right-0 bg-black/50 p-1 z-10" onClick={onNext}>
                        <GrFormNext className="text-2xl md:text-3xl xl:text-4xl text-white" />
                    </button>
                    <div className="flex justify-center items-center h-full">
                        <AnimatePresence initial={false} mode="wait" custom={direction}> 
                            <motion.div
                                key={image}
                                variants={slideVariants}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30, bounce: false, duration: .3 },
                                }}
                                aria-label="image-wrapper"
                                
                                >
                                <Image
                                    src={image}
                                    alt="gallery"
                                    width={500}
                                    height={500}
                                    className="object-cover h-full"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        )
}