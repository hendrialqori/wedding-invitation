import React from "react"
import { motion, type MotionProps } from "framer-motion"
import { Slot, Slottable } from '@radix-ui/react-slot';

export default function MotionHeading({ children, ...motionProps }
    : React.ComponentPropsWithoutRef<"h1"> & MotionProps) {
    return (
        <motion.h1 {...motionProps}>
            {children}
        </motion.h1>
    )
}