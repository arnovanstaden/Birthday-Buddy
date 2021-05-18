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
