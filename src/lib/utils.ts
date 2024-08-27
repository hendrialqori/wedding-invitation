import { doc, collection } from "firebase/firestore";
import { db_firestore } from "@/configs/firebase";

export function uniqueId(collectionName: string) {
    // Generate a reference to a new document in the collection
    const newDocRef = doc(collection(db_firestore, collectionName));

    // Get the unique ID from the document reference
    const uniqueId = newDocRef.id;

    return uniqueId;
}