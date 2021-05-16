import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { uploadProfilePicture, deleteProfilePicture } from "./storage";

// Firestore Refs
const userRef = db.collection('users');
const birthdaysCollectionRef = (uid) => userRef.doc(uid).collection("birthdays");

// CREATE
export const addBirthday = async (data) => {
    const uid = await auth.currentUser.uid;
    data.uid = uid;
    const profilePicture = data.profilePicture
    delete data.profilePicture;

    const result = await birthdaysCollectionRef(uid).add(data)
        .then((ref) => {
            return {
                ...data,
                id: ref.id,
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })

    // Upload Profile Picture
    if (profilePicture) {
        const profilePictureUrl = await uploadProfilePicture(result.id, profilePicture)
        await birthdaysCollectionRef(uid).doc(result.id).update({
            profilePictureUrl: profilePictureUrl
        })
        result.profilePictureUrl = profilePictureUrl;
    }

    return {
        birthday: result,
        message: "Birthday Saved Successfully"
    }

}

export const getAllBirthdays = async () => {
    const uid = await auth.currentUser.uid;
    const querySnapshot = await db.collectionGroup('birthdays').where('uid', '==', uid).get();
    const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return result
}

// READ

export const getBirthday = async (birthday_id) => {
    const uid = await auth.currentUser.uid;

    const result = await birthdaysCollectionRef(uid).doc(birthday_id).get()
        .then((doc) => {
            if (!doc) {
                return undefined
            }
            return {
                id: doc.id,
                ...doc.data(),
            }
        });

    return result
}

// UPDATE
export const editBirthday = async (data) => {
    const uid = await auth.currentUser.uid;
    const profilePicture = data.profilePicture
    delete data.profilePicture;

    await birthdaysCollectionRef(uid).doc(data.id).update(data);


    // Upload Profile Picture
    if (profilePicture) {
        const profilePictureUrl = await uploadProfilePicture(data.id, profilePicture)
        await birthdaysCollectionRef(uid).doc(data.id).update({
            profilePictureUrl: profilePictureUrl
        })
        data.profilePictureUrl = profilePictureUrl;
    }
    return {
        data,
        message: "Birthday Updated"
    }
}


// DELETE

export const deleteBirthday = async (birthday_id) => {
    const uid = await auth.currentUser.uid;

    const result = await await birthdaysCollectionRef(uid).doc(birthday_id).delete()
        .then(() => {
            deleteProfilePicture(birthday_id)
            return {
                message: "Birthday Deleted"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })

    return result
}