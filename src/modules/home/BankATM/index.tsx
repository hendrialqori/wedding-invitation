"use client"

import React from "react";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa6";
import { motion, type Variants } from "framer-motion"
import { FiGift } from "react-icons/fi";
import Modal from "@/components/Modal";

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

export default function BankATM() {
    let [open, setOpen] = React.useState(false)

    return (
        <section className="container-box2 mt-betweenSectionMd xl:mt-betweenSection">
            <motion.div
                className="py-14 xl:py-20 flex flex-col justify-center items-center gap-10"
                aria-label="wrapper"
                {...anim(bluryEffect)}
            >
                <h3 className="heading-4 md:heading-3 font-dancing-script text-center font-bold px-4 md:px-0">
                    Your presence is the best gift,
                    but if you can&apos;t come and still want to contribute to our future,
                    our bank details are below.
                </h3>
                <Modal open={open} setOpen={setOpen}>
                    <Modal.Button>
                        <div className="flex items-center justify-center gap-3 bg-black text-white rounded-md px-4 py-2 outline-gray-500 active:outline-double active:outline-2 outline-offset-2">
                            <FiGift className="text-2xl" />
                            <p className="font-light">Give me gift</p>
                        </div>
                    </Modal.Button>
                    <Modal.Content>
                        <div className="flex flex-col justify-center items-center pt-8 pb-4 gap-3">
                            <ATM name="Kio sato" number="1750674999" />
                            <p className="text-gray-500">or</p>
                            <ATM name="Christine" number="3832888882" />
                        </div>
                    </Modal.Content>
                </Modal>
            </motion.div>
        </section>
    )
}


function ATM({ name, number }: { name: string, number: string }) {
    let [copied, setCopied] = React.useState(false)

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(number);
            setCopied(true);

            setTimeout(() => setCopied(false), 1500)
            /* Resolved - text copied to clipboard successfully */
        } catch (err) {
            setCopied(false)
            /* Rejected - text failed to copy to the clipboard */
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <Image src="/bca.svg" alt="bca-icon" width={70} height={70} />
            <p className="font-medium">{`${number} a/n ${name}`}</p>
            <button className="bg-ivory rounded-md" onClick={copyText}>
                <div className="px-3 py-[7px] flex items-center justify-center gap-x-2 text-white">
                    <FaRegCopy className="text-black" />
                    <p className="text-sm text-black">{copied ? "Copied!" : "Copy bank number"}</p>
                </div>
            </button>
        </div>
    )
}