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

export const deleteSharedBirthdays = async (birthdays) => {
    const uid = await auth.currentUser.uid;
    let batch = db.batch();


    birthdays.forEach(birthday => {
        let birthdayRef = sharedCollectionsRef(uid).doc(birthday.id);
        batch.delete(birthdayRef);
    })

    const result = await batch.commit().then((result) => {
        return
    }).catch(err => console.log(err));
    return result
}