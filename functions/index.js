const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase)

exports.sendDailyNotifications = functions.https.onRequest((req, res) => {
    const usersRef = admin.firestore().collection('users');

    // Get users with reminders === true
    usersRef.where('reminders', '==', true).get().then((usersSnapshot) => {
        const users = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Get Birthdays Today
        users.forEach((user, index) => {
            admin.firestore().collectionGroup('birthdays').where('uid', '==', user.id).get().then((birthdaysSnapshot) => {
                const birthdays = birthdaysSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const allBirthdaysToday = []
                birthdays.forEach(birthday => {
                    const birthDate = new Date(birthday.date);
                    const today = new Date()
                    const birthdayFormatted = `${birthDate.getDate()}/${birthDate.getMonth()}`
                    const todayFormatted = `${today.getDate()}/${today.getMonth()}`
                    if (birthdayFormatted === todayFormatted) {
                        allBirthdaysToday.push(birthday)
                    }
                });

                // Send Notifications
                if (allBirthdaysToday.length > 0) {
                    const message = {
                        notification: {
                            title: "Birthday Reminder",
                            body: `It's ${allBirthdaysToday[0].name}'s birthday today. Send him a message.`,
                        },
                        data: {
                            url: `https://birthday-buddy.vercel.app/birthday/${allBirthdaysToday[0].id}`
                        },
                        token: user.fcm_token
                    };

                    if (allBirthdaysToday.length > 1) {
                        message.notification.body = `You have ${allBirthdaysToday.length} friends who celebrate their birthdays today! Send them a message!`
                        message.data.url = `https://birthday-buddy.vercel.app/`
                    }

                    admin.messaging().send(message).then((response) => {
                        // Response is a message ID string.
                        console.log('Successfully sent message:', response);
                    })
                        .catch((error) => {
                            console.log('Error sending message:', error);
                        });
                }
            });

            if (users.length - 1 === index) {
                res.status(200).send("OK")
            }
        })
    })
})