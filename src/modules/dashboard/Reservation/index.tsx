"use client";

import React from "react";
import { db_firestore } from "@/configs/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { MdOutlineHowToVote } from "react-icons/md";
import type { Reservation as TReservation } from "@/types/Reservation";
import Control from "@/components/ControlFlow";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)


export default function Reservation() {
    let [respondent, setRespondent] = React.useState<TReservation[]>([])
    let [error, setError] = React.useState({
        isError: false,
        message: ""
    })
    let [currentPage, setCurrentPage] = React.useState(1)


    // pagination
    const limit = 5
    const totalPage = Math.ceil(respondent.length / limit)
    const currentRespondent = React.useMemo(() => {
        return respondent.slice((currentPage - 1) * limit, currentPage * limit)
    }, [respondent, currentPage])

    // total respondent & attendance
    const totalRespondent = respondent.length
    const totalAttendance = respondent
        .filter((person) => person.present)
        .reduce((acc, current) => acc + current.total, 0)

    React.useEffect(() => {
        const references = collection(db_firestore, "reservations")
        const q = orderBy("created_at", "desc")

        const request = query(references, q)

        const subscribe = onSnapshot(request,
            (snapshot) => {
                const respons = snapshot.docs.map((doc) => ({ ...doc.data() })) as unknown as TReservation[]

                setRespondent(respons)
            },
            (error) => {
                setError({
                    isError: true,
                    message: error.message
                })
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
        const end = Math.min(limit * currentPage, respondent.length)

        return <span className="text-center">Showing {start} - {end} from {respondent.length}</span>
    }

    return (
        <div className="w-[calc(100%_-_50px)] md:w-1/2 ">
            <div className="space-y-4 md:space-y-2 border-gray-200 pb-4">
                <h3 className="heading-5 font-bold">Reservation</h3>
                <div className="space-y-5 md:space-y-1">
                    <div className="flex flex-col md:flex-row items-start gap-1 md:gap-3">
                        <div className="flex items-center gap-x-2">
                            <FaUser />
                            <p>Respondent</p>
                        </div>
                        <p className="font-semibold"> {totalRespondent ?? "-"} people</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-1 md:gap-3">
                        <div className="flex items-center gap-x-2">
                            <FaPeopleGroup className="text-xl" />
                            <p>Total of people who will attend </p>
                        </div>
                        <p className="font-semibold"> {totalAttendance ?? "-"} people {" "}
                            <sup
                                className="bg-green-500 text-white rounded-xl text-sm px-5 py-1 -translate-y-3"
                            >
                                Attend
                            </sup>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-10 space-y-3">
                <Control>
                    <Control.Show when={error.isError}>
                        <div className="text-center mt-10">
                            <span className="text-center text-red-600">{error.message || "Something went wrong :("}</span>
                        </div>
                    </Control.Show>

                    <Control.Otherwise>
                        {currentRespondent.map((wish, i) => (
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

        </div>
    )
}

const colors = {
    true: "bg-green-500",
    false: "bg-red-500"
}

function Respondent(props: TReservation) {
    const timeAgo = new TimeAgo('en-US')
    const result = timeAgo.format(new Date(props.created_at))
    return (
        <figure className="flex gap-3 border-b border-gray-200 pb-5">
            <div className="mt-1">
                <MdOutlineHowToVote className="text-sm md:text-xl" />
            </div>
            <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm md:text-base">{props.name}</h3>
                    <span
                        className={`${colors[JSON.stringify(props.present) as keyof typeof colors]}
                        text-white rounded-xl text-sm px-5 py-1`}
                    >
                        {props.present ? "Attend" : "Not-Attend"}
                    </span>
                </div>
                <div className="flex items-center text-sm gap-2">
                    <FaPeopleGroup className="text-xl" />
                    <p className="text-sm font-semibold">{props.total} Person will be attend</p>
                </div>
                <p className="mt-2 text-sm md:text-base font-roboto-slab">
                    {props.message}
                </p>
                <div className="pt-2 flex justify-end">
                    <span className="font-semibold text-sm">{result}</span>
                </div>
            </div>

        </figure>
    )
}