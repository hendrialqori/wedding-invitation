"use client";

import { db_firestore } from "@/configs/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { FaUser } from "react-icons/fa6";

export default function Guestbook() {

    let [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        const references = collection(db_firestore, "wishes")
        const q = orderBy("created_at", "desc")

        const request = query(references, q)

        const subscribe = onSnapshot(request,
            (snapshot) => {
                const wishes = snapshot.docs.map((doc) => ({ ...doc.data() }))
               setTotal(wishes.length)
            },
            (error) => {
                console.log(error)
            }
        )

        return () => subscribe()
    }, [])

    return (
        <div className="w-[calc(100%_-_50px)] md:w-1/2 space-y-4 md:space-y-2 border-b-2 border-gray-200 pb-4">
            <h3 className="heading-5 font-bold">Guestbook</h3>
            <div className="space-y-1">
                <div className="flex flex-col md:flex-row items-start gap-1 md:gap-3">
                    <div className="flex items-center gap-x-2">
                        <FaUser />
                        <p>Respondent </p>
                    </div>
                    <p className="font-semibold"> {total} people commented</p>
                </div>

            </div>
        </div>
    )
}