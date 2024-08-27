"use client"

import React from "react"
import { motion, type MotionProps } from "framer-motion"

export function Heading({ children, ...motionProps }
    : React.ComponentPropsWithoutRef<"h1"> & MotionProps) {
    return (
        <motion.h1 {...motionProps}>
            {children}
        </motion.h1>
    )
}

export function Box({ children, ...motionProps }
    : React.ComponentPropsWithoutRef<"div"> & MotionProps) {
    return (
        <motion.div {...motionProps}>
            {children}
        </motion.div>
    )
}