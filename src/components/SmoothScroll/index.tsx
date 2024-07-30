"use client";

type Props = {
    children: React.ReactNode
}

import React from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import "locomotive-scroll/locomotive-scroll.css";

import { motion } from 'framer-motion';

const SmoothScroll = ({ children }: Props) => {

    const ref = React.useRef<HTMLElement | null>(null)

    React.useLayoutEffect(() => {
        let locomotiveScroll = new LocomotiveScroll({
            el: ref.current!,
            smooth: true
        })

        return () => {
            locomotiveScroll?.destroy()
        }
    }, [])

    return (
        <motion.main
            ref={ref}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, }}
            className='bg-ivory min-h-screen'>
            {children}
        </motion.main>
    )
}

export default SmoothScroll