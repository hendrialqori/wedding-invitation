"use client";

import { createContext, useContext , useState } from "react";

type Value = {
    isShowMain: boolean
    onShowMain: () => void
}

const Animate = createContext({} as Value)


export function AnimateContext({ children }: { children: React.ReactNode }) {

    const [isShowMain, setShoMain] = useState(false)

    const handleShowMain = () => {
        setShoMain(true)
    }

    return (
        <Animate.Provider value={{ isShowMain, onShowMain: handleShowMain }}>
            {children}
        </Animate.Provider>
    )
}


export function useAnimateContext() {
    return useContext(Animate)
}