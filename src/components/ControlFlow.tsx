import React from "react";

type Props = {
    children: React.ReactNode
}

function Control({ children }: Props) {
    let show: React.ReactNode;
    let otherwise: React.ReactNode;

    React.Children.map(children, (child) => {

        if (React.isValidElement(child)) {
            if (Control.Show == child.type && child.props.when) {
                show = child
            } else if (Control.Otherwise == child.type) {
                otherwise = child
            }
        }
    })

    return show ?? otherwise
}


Control.Show = (props: Props & { when: boolean }) => props.children
Control.Otherwise = (props: Props) => props.children

export default Control