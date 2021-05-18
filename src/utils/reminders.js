import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { addHours } from 'date-fns'




export const storeFCMRegToken = async (token) => {
    if (auth.currentUser) {
        const uid = await auth.currentUser.uid;
        await db.collection('users').doc(uid).update({
            fcm_token: token
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
    const result = await remindersCollectionRef(uid).add(data)
        .then((ref) => {
            console.log(ref)
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
