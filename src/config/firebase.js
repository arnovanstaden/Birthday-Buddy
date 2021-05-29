import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/messaging";
import { storeFCMRegToken } from "../utils/reminders"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_FIREBASE_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();

export default app;

// Auth
export const auth = firebase.auth();

// Database
export const db = firebase.firestore();

//  Storage
export const storage = firebase.storage();

// Analytics
export const analytics = firebase.analytics();

// Messaging
if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
} else {
    const messaging = firebase.messaging();

    messaging.getToken({ vapidKey: process.env.REACT_APP_FIREBASE_WPC_KEY_PAIR }).then((currentToken) => {
        if (currentToken) {
            storeFCMRegToken(currentToken)
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });

    messaging.onMessage((payload) => {
        console.log("foreground message received", payload)
        if (Notification.permission === "granted") {
            const notificationOptions = {
                title: payload.data.title,
                icon: '/images/logos/logo192-transparent.png',
                badge: '/images/logos/logo192-transparent.png',
                vibrate: [100, 50, 100],
                body: payload.data.body,
                data: {
                    time: new Date(Date.now()).toString(),
                    primaryKey: 1,
                    url: payload.data.url
                }
            };

            const notification = new Notification(notificationOptions.title, notificationOptions);
            notification.onclick = ((e) => {
                e.preventDefault();
                window.open(e.currentTarget.data.url, '_blank');
            })
        }
    });
}




