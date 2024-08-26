import { motion } from "framer-motion"
import React from "react"


type Props<T extends "div"> = React.ComponentProps<T> & {
    as: string,
}

type Refs = HTMLElement

const Motion = <T extends "div">(props: Props<T>) => {

    const Component = props.as || "div"

    return (
        //@ts-ignore
        <Component>
            {props.children}
        </Component>
    )
}