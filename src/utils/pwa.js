export const registerServiceWorker = () => {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', {
            scope: '.'
        }).then(function (registration) {
            // Registration was successful
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

// Notifications - Setup

export const requestNotificationPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
        Notification.requestPermission()
    }
}
