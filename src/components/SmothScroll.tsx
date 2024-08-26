"use client";

type Props = {
    children: React.ReactNode
}

import React from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import "locomotive-scroll/locomotive-scroll.css";


function SmoothScroll({ children }: Props) {

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
        <main
            ref={ref}
            className='bg-ivory min-h-screen'>
            {children}
        </main>
    )
}

export default SmoothScroll