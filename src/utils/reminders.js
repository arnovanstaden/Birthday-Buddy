import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { addHours } from 'date-fns'
import firebase from "firebase/app";
import "firebase/messaging";

// Config
const usersRef = db.collection('users');

const fetchFCMToken = async () => {
    console.log("fetching token")
    if (!('Notification' in window)) {
        return console.log("This browser does not support notifications.");
    }
    const messaging = firebase.messaging();
    const token = await messaging.getToken({ vapidKey: process.env.REACT_APP_FIREBASE_WPC_KEY_PAIR }).then((currentToken) => {
        if (currentToken) {
            return currentToken
        } else {
            return undefined
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
    return token
}

export const storeFCMRegToken = async () => {
    const token = await fetchFCMToken();
    if (auth.currentUser && token) {
        const uid = await auth.currentUser.uid;
        await usersRef.doc(uid).update({
            fcm_tokens: firebase.firestore.FieldValue.arrayUnion(token)
        }).then(() => {
            console.log("Token Updated!");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating token: ", error);
        });
    }
    return
}

export const deleteFCMRegToken = async () => {
    const token = await fetchFCMToken();
    if (auth.currentUser && token) {
        const uid = await auth.currentUser.uid;
        await usersRef.doc(uid).update({
            fcm_tokens: firebase.firestore.FieldValue.arrayRemove(token)
        }).then(() => {
            console.log("Token Deleted!");
        }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating token: ", error);
        });
    }
    return
}

export const scheduleReminder = async (hours, birthday) => {
    // Firestore Refs
    const uid = await auth.currentUser.uid;
    const userRef = db.collection('users');
    const remindersCollectionRef = (uid) => userRef.doc(uid).collection("reminders");
    const reminderTime = addHours(new Date(), hours);

    const data = {
        uid: uid,
        time: reminderTime,
        birthday
    }
    await remindersCollectionRef(uid).add(data)
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

    return {
        message: "Reminder Set"
    }
}
