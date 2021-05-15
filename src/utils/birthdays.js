import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { uploadProfilePicture } from "./storage";

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
                id: ref.id,
                message: "Birthday Saved Successfully"
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
    }

    return result
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

export const getBirthday = async (deck_id) => {
    // const uid = await auth.currentUser.uid;

    // const result = await decksRef(uid).doc(deck_id).get()
    //     .then((doc) => {
    //         if (!doc) {
    //             return undefined
    //         }
    //         return {
    //             id: doc.id,
    //             ...doc.data(),
    //         }
    //     });

    // return result
}

// UPDATE
export const saveDeck = async (data) => {
    // const uid = await auth.currentUser.uid;
    // data.uid = uid;
    // await decksRef(uid).doc(data.id).update(data)
    // return {
    //     id: data.id,
    //     message: "Deck Updated Successfully"
    // }
}


// DELETE

export const deleteDeck = async (deck_id) => {
    // const uid = await auth.currentUser.uid;

    // const result = await await decksRef(uid).doc(deck_id).delete()
    //     .then(() => {
    //         return {
    //             message: "Deck Deleted Successfully"
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         throw err.response.data;
    //     })

    // return result
}