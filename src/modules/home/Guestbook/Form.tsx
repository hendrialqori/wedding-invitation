"use client";

import React from "react";
import z from "zod"
import { db_firestore } from "@/configs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { uniqueId } from "@/utils/helpers";
import { toast } from "sonner";

const pattern = /[<>*'"`=)(:;\/\\]/;

const initialForm = { name: "", message: "" }

const formScheme = z.object({
    name: z.string()
        .min(1, { message: "Name field is required" })
        .max(50, { message: "Value cannot long from 50 characters" })
        .refine((value) => !pattern.test(value), { message: `Value cannot contain special characters ${pattern}` }),

    message: z.string()
        .min(1, { message: "Message field is required" })
        .max(200, { message: "Value cannot long from 200 characters" })
})

type Errors = {
    [field: string]: string[]
}

export default function Form() {

    let [form, setForm] = React.useState(initialForm)
    let [formErrors, setFormErrors] = React.useState({} as Errors)

    async function addWish(value: typeof form) {
        const collectionName = "wishes"
        const id = uniqueId(collectionName)

        await setDoc(doc(db_firestore, collectionName, id), {
            name: value.name,
            message: value.message,
            created_at: Date.now()
        });
    }

    function handleChange<T extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<T>) {
        const name = e.target.name
        const value = e.target.value
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function submit(e: React.SyntheticEvent) {
        e.preventDefault()

        setFormErrors({})

        try {
            const value = formScheme.parse(form)

            await addWish(value)

            toast.success('Submitting successful')
            setForm({ name: "", message: "" })

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
        <form onSubmit={submit} className="space-y-6">
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
            <div className="flex justify-end">
                <button className="font-roboto-slab w-max ml-auto mr-0 bg-black text-ivory rounded-md px-10 py-2
                text-sm md:text-base outline-gray-500 active:outline-double active:outline-2 outline-offset-2">
                    Send
                </button>
            </div>
        </form>
    )
}

