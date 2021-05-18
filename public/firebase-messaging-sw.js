importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAPPJmu61h-lIecZyQVqDe6oHdp7Cg2KhM",
    authDomain: "birthday-buddy-3daf2.firebaseapp.com",
    projectId: "birthday-buddy-3daf2",
    storageBucket: "birthday-buddy-3daf2.appspot.com",
    messagingSenderId: "479609409443",
    appId: "1:479609409443:web:5080efcc483b2175c69416",
    measurementId: "G-E87KK2GQFG"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("here")
    console.log('Received background message ', payload);
    const notificationOptions = {
        title: payload.notification.title,
        icon: '/images/logos/logo195.png',
        badge: '/images/logos/logo195.png',
        vibrate: [100, 50, 100],
        body: payload.notification.body,
        data: {
            time: new Date(Date.now()).toString(),
            primaryKey: 1,
            url: payload.data.url
        }
    };
    // notification.action ? options[actions] === notification.action : null;
    self.registration.showNotification(notificationOptions.title, notificationOptions);
});

self.addEventListener('notificationclick', function (e) {
    console.log("here")
    const notification = e.notification;
    const primaryKey = notification.data.primaryKey;
    if (primaryKey === 1) {
        clients.openWindow(notification.data.url);
    }
    notification.close();
});
