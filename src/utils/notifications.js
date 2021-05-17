import { messaging } from "../config/firebase"

export const initializeNotifications = () => {
    messaging.getToken({ vapidKey: process.env.REACT_APP_FIREBASE_WPC_KEY_PAIR }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken)
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });

    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
    });
}