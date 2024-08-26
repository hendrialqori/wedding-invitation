"use client";

import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdAccessTime } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Control from "@/components/ControlFlow";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";
import { Wish } from "@/types/Wish";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)


export default function Wishes() {
    let [wishes, setWishes] = React.useState<Wish[]>([])
    let [error, setError] = React.useState({
        isError: false,
        message: ""
    })
    let [currentPage, setCurrentPage] = React.useState(1)

    // pagination
    const limit = 5
    const totalPage = Math.ceil(wishes.length / limit)
    const currentWishes = React.useMemo(() => {
        return wishes.slice((currentPage - 1) * limit, currentPage * limit)
    }, [wishes, currentPage])


    React.useEffect(() => {
        const references = collection(db_firestore, "wishes")
        const q = orderBy("created_at", "desc")

        const request = query(references, q)

        const subscribe = onSnapshot(request,
            (snapshot) => {
                const wishes = snapshot.docs.map((doc) => ({ ...doc.data() })) as Wish[]
                setWishes(wishes)
            },
            (error) => {
                setError({ isError: true, message: error.message })
            }
        )

        return () => subscribe()
    }, [])

    function prevPage() {
        setCurrentPage((prev) => {
            const acc = prev + -1
            return Math.max(acc, 1)
        })
    }

    function nextPage() {
        setCurrentPage((prev) => {
            const acc = prev + 1
            return Math.min(acc, totalPage)
        })
    }

    function Helpers() {
        const start = limit * (currentPage - 1) + 1
        const end = Math.min(limit * currentPage, wishes.length)

        return <span className="text-center">Showing {start} - {end} from {wishes.length}</span>
    }

    return (
        <div className="space-y-3 mt-11">
            <Control>
                <Control.Show when={error.isError}>
                    <div className="text-center mt-10">
                        <span className="text-center text-red-600">{error.message || "Something went wrong :("}</span>
                    </div>
                </Control.Show>

                <Control.Otherwise>
                    {currentWishes.map((wish, i) => (
                        <Respondent key={i} {...wish} />
                    ))}
                    <div className="flex justify-center items-center gap-5 font-roboto-slab text-xs md:text-base pt-5">
                        <button
                            className="flex items-center justify-center px-2 rounded-md 
                    outline-gray-500 active:outline-double active:outline-2 outline-offset-2"
                            onClick={prevPage}
                        >
                            <GrFormPrevious className="text-xl" />
                            <span className="">Previous</span>
                        </button>
                        <Helpers />
                        <button
                            className="flex items-center justify-center px-2 rounded-md 
                    outline-gray-500 active:outline-double active:outline-2 outline-offset-2"
                            onClick={nextPage}
                        >
                            <span className="">Next</span>
                            <GrFormNext className="text-xl translate-y-[1px]" />
                        </button>
                    </div>
                </Control.Otherwise>
            </Control>
        </div>
    )
}

function Respondent(props: Wish) {
    const timeAgo = new TimeAgo('en-US')
    const result = timeAgo.format(new Date(props.created_at))

    return (
        <figure className="flex gap-3 border-b border-gray-200 pb-5">
            <div className="mt-1">
                <FiMessageSquare className="text-sm md:text-xl" />
            </div>
            <div>
                <div className="flex items-center">
                    <h3 className="font-semibold text-sm md:text-base">{props.name}</h3>
                    <RiVerifiedBadgeFill className="text-blue-400" />
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <MdAccessTime />
                    <p className="text-sm">{result}</p>
                </div>
                <p className="mt-2 text-sm md:text-base font-roboto-slab">
                    {props.message}
                </p>
            </div>
        </figure>
    )
}