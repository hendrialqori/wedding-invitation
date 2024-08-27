"use client";

import React from "react";
import z from "zod"
import { toast } from "sonner";
import { db_firestore } from "@/configs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { uniqueId } from "@/lib/utils";

const pattern = /[<>*'"`=)(:;\/\\]/;

const initialForm = { name: "", total: "", message: "", present: "0" }

const formScheme = z.object({
    name: z.string()
        .min(1, { message: "Name field is required" })
        .max(50, { message: "Value cannot long from 50 characters" })
        .refine((value) => !pattern.test(value), { message: `Value cannot contain special characters ${pattern}` }),
    total: z.string()
        .min(1, { message: "Minimum 1 guest will be attend" }),
    message: z.string()
        .min(1, { message: "Message field is required" })
        .max(200, { message: "Value cannot long from 200 characters" }),
})

type Errors = {
    [field: string]: string[]
}

export default function Form() {

    let [form, setForm] = React.useState(initialForm)
    let [formErrors, setFormErrors] = React.useState({} as Errors)

    // transform total type from string to number and present become boolean
    async function addReservation(value: Omit<typeof form, "total" | "present"> & { total: number; present: boolean }) {
        const collectionName = "reservations"
        const id = uniqueId(collectionName)

        await setDoc(doc(db_firestore, collectionName, id), {
            name: value.name,
            total: value.total,
            present: value.present,
            message: value.message,
            created_at: Date.now()
        });
    }

    function handleChange<T extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<T>) {
        const name = e.target.name
        const value = e.target.value

        const sanitized = value.replace(/\D/g, '')

        setForm(prev => ({
            ...prev,
            [name]: name === "total" ? sanitized : value
        }))
    }


    async function submit(e: React.SyntheticEvent) {
        e.preventDefault()

        setFormErrors({})

        try {
            const value = formScheme.parse(form)
            // transform total type from string to number and present become boolean
            const transformValue = { ...value, total: Number(value.total), present: Boolean(Number(form.present))  }

            await addReservation(transformValue)

            toast.success('Submitting successful')
            setForm(initialForm)

        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = err.flatten().fieldErrors
                setFormErrors(fieldErrors as unknown as Errors)
            }
        }
    }


    function FieldError({ name }: { name: string }) {
        return formErrors[name] && <span className="text-sm text-red-600">{formErrors[name].join(", ")}</span>
    }

    return (
        <form onSubmit={submit} className="space-y-3 mt-10 max-w-xl mx-auto px-5 md:px-0">
            <div className="space-y-1">
                <input
                    type="text"
                    className="block w-full rounded-md bg-gray-100 border-transparent focus:border-ivory focus:bg-white focus:ring-0"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    name="name"
                />
                <FieldError name="name" />
            </div>
            <div className="space-y-1">
                <input
                    type="text"
                    className="block w-full rounded-md bg-gray-100 border-transparent focus:border-ivory focus:bg-white focus:ring-0"
                    placeholder="Total"
                    value={form.total}
                    onChange={handleChange}
                    name="total"
                />
                <FieldError name="total" />
            </div>
            <div>
                <div className="relative">
                    <textarea
                        className="block w-full rounded-md bg-gray-100 border-transparent focus:border-ivory focus:bg-white focus:ring-0 resize-none"
                        rows={5}
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        maxLength={200}
                        name="message"
                    />
                    <span className="absolute bottom-1 right-1">{200 - form.message.length}</span>
                </div>
                <FieldError name="message" />
            </div>
            <div className="space-y-4 md:space-y-2 pt-2">
                <p className="font-roboto-slab text-sm md:text-base font-medium">Confirmation</p>
                <div className="flex items-center gap-3">
                    <input
                        id="yes"
                        type="radio"
                        className="form-checkbox rounded bg-gray-200 border-transparent focus:border-transparent
                        focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                        name="present"
                        onChange={handleChange}
                        value="1"
                    />
                    <label htmlFor="yes" className="font-roboto-slab text-sm md:text-base">Yes, Will Attend</label>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        id="no"
                        type="radio"
                        className="form-checkbox rounded bg-gray-200 border-transparent focus:border-transparent
                        focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                        name="present"
                        onChange={handleChange}
                        value="0"
                        defaultChecked
                    />
                    <label htmlFor="no" className="font-roboto-slab text-sm md:text-base"> No, Will Not Attend</label>
                </div>
            </div>
            <div className="flex justify-end pt-4 md:pt-0">
                <button className="w-max ml-auto mr-0 bg-black text-ivory rounded-md px-10 py-2 text-sm md:text-base
                outline-gray-500 active:outline-double active:outline-2 outline-offset-2 font-roboto-slab">
                    Send
                </button>
            </div>
        </form>
    )
}

