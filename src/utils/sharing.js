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
        const delete_id = birthday.id
        delete birthday.shareDate;
        delete birthday.id;

        let addBirthdayRef = birthdaysCollectionsRef(uid).doc();
        batch.set(addBirthdayRef, birthday);

        let deleteBirthdayRef = sharedCollectionsRef(uid).doc(delete_id);
        batch.delete(deleteBirthdayRef);
    })

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

export const shareBirthdays = async (shareUID, birthdays) => {
    let batch = db.batch();

    const querySnapshot = await sharedCollectionsRef(shareUID).get()
    const sharedBirthdays = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    birthdays.forEach(birthday => {
        // Initial Data
        delete birthday.shareDate;
        delete birthday.id;
        delete birthday.uid;
        delete birthday.notes;
        birthday.sharedDate = new Date();

        // Handle Duplicates
        const duplicate = sharedBirthdays.filter(item => item.name === birthday.name && item.date === birthday.date && item.profilePictureUrl === birthday.profilePictureUrl);
        if (!duplicate.length > 0) {
            let addSharedRef = sharedCollectionsRef(shareUID).doc();
            batch.set(addSharedRef, birthday);
        }
    });

    const result = await batch.commit().then((result) => {
        return {
            message: birthdays.length > 1 ? "Birthdays Shared" : "Birthday Shared"
        }
    }).catch(err => {
        console.log(err);
        throw new Error(`${birthdays.length > 1 ? "Error Sharing Birthdays" : "Error Sharing Birthday"}`)
    });
    return result
}