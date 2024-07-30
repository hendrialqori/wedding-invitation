"use client"

import React from "react"
import { FaRegCopy } from "react-icons/fa6";

export default function Input() {

    const [query, setQuery] = React.useState("")
    const [copied, setCopied] = React.useState(false)
    const [host, setHost] = React.useState("")
    const link = host + "?to=" + query

    React.useEffect(() => {
        setHost(window.location.host)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = encodeURIComponent(e.target.value)
        setQuery(value)
    }

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);

            setTimeout(() => setCopied(false), 1500)
            /* Resolved - text copied to clipboard successfully */
        } catch (err) {
            setCopied(false)
            /* Rejected - text failed to copy to the clipboard */
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-dvh gap-3">
            <div>
                <h1>Generate invite link here</h1>
            </div>
            <div className="w-max flex flex-col justify-center items-center gap-2">
                <input
                    type="search"
                    className="appearance-none border border-gray-500 active:outline-none rounded-lg py-2 px-3 w-72 md:w-96"
                    placeholder="exp: Boy & Patner"
                    onChange={handleChange}
                />
                <p className="text-center">{link}</p>
            </div>

            <button className="bg-black rounded-md group" onClick={copyText}>
                <div className="flex items-center justify-center gap-x-2 text-white w-32 py-[7px] group-hover:scale-90 group-active:scale-[.8] transition duration-300">
                    <FaRegCopy />
                    <p className="text-sm">{copied ? "Copied!" : "Copy link!"}</p>
                </div>
            </button>
        </div>
    )
}