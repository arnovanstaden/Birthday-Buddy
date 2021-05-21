import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// Firestore Refs
const usersRef = db.collection('users');

export const createDbUser = async (newUser) => {
    const uid = await auth.currentUser.uid;
    delete newUser.uid;
    const saveResult = await usersRef.doc(uid).set(
        {
            ...newUser,
            reminders: true
        }
    )
        .then((result) => {
            return result
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return saveResult
}
