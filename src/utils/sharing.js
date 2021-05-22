import { db } from "../config/firebase";
import { auth } from "../config/firebase";

// Firestore Refs
const userRef = db.collection('users');
const sharedCollectionsRef = (uid) => userRef.doc(uid).collection("shared");
const birthdaysCollectionsRef = (uid) => userRef.doc(uid).collection("birthdays");

export const getAllSharedBirthdays = async () => {
    const uid = await auth.currentUser.uid;
    const querySnapshot = await sharedCollectionsRef(uid).get()
    const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return result
}

export const importSharedBirthdays = async (birthdays) => {
    const uid = await auth.currentUser.uid;
    let batch = db.batch();


    birthdays.forEach(birthday => {
        // Initial Data
        birthday.notes = "";
        birthday.uid = uid;
        birthday.shared = true;
        delete birthday.shareDate;
        delete birthday.id;

        let birthdayRef = birthdaysCollectionsRef(uid).doc();
        batch.set(birthdayRef, birthday);
    })

    // FIX THIS - DELETE SHARED BIRTHDAY
    // birthdays.forEach(birthday => {
    //     let birthdayRef = sharedCollectionsRef(uid).doc(birthday.id);
    //     batch.delete(birthdayRef);
    // })

    const result = await batch.commit().then((result) => {
        return {
            message: birthdays.length > 1 ? "Birthdays Imported" : "Birthday Imported"
        }
    }).catch(err => {
        console.log(err);
        throw new Error(`${birthdays.length > 1 ? "Birthdays Imported" : "Birthday Imported"}`)
    });



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
        return {
            message: birthdays.length > 1 ? "Birthdays Deleted" : "Birthday Deleted"
        }
    }).catch(err => {
        console.log(err);
        err.UIError = birthdays.length > 1 ? "Error Deleting Birthdays" : "Error Deleting Birthday"
        throw err
    });

    return result
}