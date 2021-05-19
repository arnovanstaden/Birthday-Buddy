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
if ('serviceWorker' in navigator) {
    const messaging = firebase.messaging();

    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });

    messaging.onBackgroundMessage(function (payload) {
        console.log('Received background message ', payload);
        showNotification(payload)
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

}

function showNotification(payload) {
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
    // notification.action ? options[actions] === notification.action : null;
    self.registration.showNotification(notificationOptions.title, notificationOptions);
}


