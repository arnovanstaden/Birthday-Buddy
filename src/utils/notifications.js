import { db } from "../config/firebase";
import { auth } from "../config/firebase";



export const storeFCMRegToken = async (token) => {
    if (auth.currentUser) {
        const uid = await auth.currentUser.uid;
        await db.collection('users').doc(uid).update({
            fcm_token: token
        });
    }

    return
}
