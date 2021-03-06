const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendDailyNotifications = functions.https.onRequest((req, res) => {
    if (req.method === "GET" && req.headers.authorization === functions.config().access.key) {
        const usersRef = admin.firestore().collection('users');

        // Get users with reminders === true
        usersRef.get().then((usersSnapshot) => {
            const users = usersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Get Birthdays Today
            users.forEach((user, index) => {
                usersRef.doc(user.id).collection('birthdays').get().then((birthdaysSnapshot) => {
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

                        if (user.fcm_tokens && user.fcm_tokens.length > 0) {
                            const message = {
                                title: "Birthday Reminder",
                                body: `It's ${allBirthdaysToday[0].name}'s birthday today. Remember to send your congratulations!`,
                                url: `https://birthday-buddy.vercel.app/birthday/${allBirthdaysToday[0].id}`,
                                tokens: user.fcm_tokens
                            };

                            if (allBirthdaysToday.length > 1) {
                                message.body = `You have ${allBirthdaysToday.length} friends who celebrate their birthday today. Remember to send your congratulations!`
                                message.url = `https://birthday-buddy.vercel.app/`
                            }

                            sendMessages(message)
                        }
                    }
                });

                if (users.length - 1 === index) {
                    res.status(200).send("OK")
                }
            })
        })
    } else {
        return res.status(403).send()
    }

});


exports.sendReminderNotifications = functions.https.onRequest((req, res) => {
    if (req.method === "GET" && req.headers.authorization === functions.config().access.key) {

        const usersRef = admin.firestore().collection('users');

        // Get users with reminders === true
        usersRef.get().then((usersSnapshot) => {
            const users = usersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Get Birthdays Today
            users.forEach((user, index) => {
                usersRef.doc(user.id).collection('reminders').get().then((remindersSnapshot) => {
                    const reminders = remindersSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    reminders.forEach(reminder => {
                        // Send Notifications
                        // Test if reminder is past
                        if (reminder.time.toDate() < new Date()) {

                            if (user.fcm_tokens && user.fcm_tokens.length > 0) {
                                sendMessages({
                                    title: "Birthday Reminder",
                                    body: `This is your reminder to wish ${reminder.birthday.name} a happy birthday today. Remember to send your congratulations!`,
                                    url: `https://birthday-buddy.vercel.app/birthday/${reminder.birthday.id}`,
                                    tokens: user.fcm_tokens
                                })
                            }

                            // Delete Reminder
                            usersRef.doc(user.id).collection('reminders').doc(reminder.id).delete()
                                .then(() => {
                                    console.log("Reminder Deleted - ", reminder.id)
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }

                    });
                });

                if (users.length - 1 === index) {
                    res.status(200).send("OK")
                }
            })
        })
    } else {
        return res.status(403).send()
    }
});

exports.sendShareNotification = functions.firestore
    .document('users/{userId}/shared/{sharedId}')
    .onCreate((snap, context) => {
        const sharedBirthday = snap.data()
        const userRef = admin.firestore().collection('users').doc(context.params.userId);
        userRef.get().then((doc) => {
            if (!doc.data()) {
                return
            }
            const user = doc.data()
            if (user.fcm_tokens && user.fcm_tokens.length > 0) {
                sendMessages({
                    title: "Birthday Shares",
                    body: `${sharedBirthday.sharedBy} shared birthdays with you! Import them to your birthdays.`,
                    url: `https://birthday-buddy.vercel.app/share`,
                    tokens: user.fcm_tokens
                })
            }
        }).catch(err => {
            console.log(err);
        })
    })


function sendMessages(messageData) {
    const message = {
        data: {
            title: messageData.title,
            body: messageData.body,
            url: messageData.url,
        },
        tokens: messageData.tokens
    };

    admin.messaging().sendMulticast(message)
        .then((response) => {
            // Response is a message ID string.
            console.log(`Successfully Sent Messages to: ${response.successCount} devices -`, response);
        })
        .catch((error) => {
            console.log('Error sending messages:', error);
        });
}