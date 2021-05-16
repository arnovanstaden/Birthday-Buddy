import { urlBase64ToUint8Array } from "./general";
import axios from "axios";

export const registerServiceWorker = () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                registration.addEventListener('updatefound', function () {
                    var installingWorker = registration.installing;
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// Notifications - Setup

export const requestNotificationPermission = () => {
    if ("Notification" in window) {
        Notification.requestPermission()
    }
}

// export const checkSubscription = async () => {
//     let subscribed;
//     if ('serviceWorker' in navigator) {
//         subscribed = await navigator.serviceWorker.getRegistration()
//             .then(function (reg) {
//                 return reg.pushManager.getSubscription()
//                     .then(function (subscription) {
//                         if (subscription === null) {
//                             return false
//                         } else {
//                             // Ensure Updated
//                             handleUserSubscription("subscribe", false);
//                             return true
//                         }
//                     })
//                     .catch(function (err) {
//                         console.log(err)
//                     });
//             })
//             .catch(function (err) {
//                 console.log(err)
//             });
//     }
//     return subscribed
// }

// export const handleUserSubscription = () => {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.ready.then(function (reg) {
//             if (status === "subscribe") {
//                 reg.pushManager.subscribe({
//                     userVisibleOnly: true,
//                     applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY)
//                 }).then(function (pushSubscription) {
//                     sendToServer(status, pushSubscription, notify)
//                 }).catch(function (e) {
//                     if (Notification.permission === 'denied') {
//                         alert('You first need to enable notifications');
//                     } else {
//                         console.error('Unable to subscribe to push', e);
//                     }
//                 });
//             } else {
//                 reg.pushManager.getSubscription()
//                     .then(function (subscription) {
//                         subscription.unsubscribe().then(function (successful) {
//                             sendToServer(status, subscription, notify)
//                         })
//                             .catch(err => console.log(err))
//                     })
//                     .catch(function (err) {
//                         console.log(err)
//                     });
//             }

//         })
//     }

//     function sendToServer(status, pushSubscription, notify) {
//         axios({
//             method: "post",
//             url: `${API_URL}/profile/subscribe`,
//             data: {
//                 status,
//                 pushSubscription,
//                 notify
//             }
//         })
//             .catch(function (err) {
//                 console.log(err)
//             });
//     }
// }