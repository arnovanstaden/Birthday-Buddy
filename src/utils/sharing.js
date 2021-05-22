import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// Firestore Refs
const userRef = db.collection('users');
const sharedCollectionsRef = (uid) => userRef.doc(uid).collection("shared");

export const getAllSharedBirthdays = async () => {
    const uid = await auth.currentUser.uid;
    const querySnapshot = await sharedCollectionsRef(uid).get()
    const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return result
}