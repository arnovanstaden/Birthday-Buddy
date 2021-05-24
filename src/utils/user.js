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
            reminders: true,
            displayName_LC: newUser.displayName.toLowerCase().trim()
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

export const verifyUserExists = async (username) => {
    const result = await db.collectionGroup('users').where('displayName_LC', '==', username).get().then((querySnapshot) => {
        return querySnapshot.docs
    }).catch(err => console.log(err))
    if (result.length > 0) {
        return result[0].id
    }
    throw Error("No user with this username found")
}
