import React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion"

const photos = [
    "/photos/slideshow/1.jpg",
    "/photos/slideshow/2.jpg",
    "/photos/slideshow/3.jpg",
    "/photos/slideshow/4.jpg",
    "/photos/slideshow/5.jpg"
]

export default function ImageShow() {

    const INTERVALTIME = 6000
    let [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                // If the index reaches the last item, reset to 0, else increment
                return prevIndex === photos.length - 1 ? 0 : prevIndex + 1;
            });
        }, INTERVALTIME)

        return () => {
            clearInterval(interval)
        }

    }, [])

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                className="w-full h-full bg-ivory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    exit={{ scale: 1.1 }}
                    transition={{ duration: 5 }}
                >
                    <Image
                        src={photos[currentIndex]}
                        alt="slideshow-image"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="object-cover w-screen h-screen"
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}