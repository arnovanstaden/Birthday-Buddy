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
                        const message = {
                            data: {
                                title: "Birthday Reminder",
                                body: `It's ${allBirthdaysToday[0].name}'s birthday today. Remember to send your congratulations!`,
                                url: `https://birthday-buddy.vercel.app/birthday/${allBirthdaysToday[0].id}`,
                            },
                            token: user.fcm_token
                        };

                        if (allBirthdaysToday.length > 1) {
                            message.notification.body = `You have ${allBirthdaysToday.length} friends who celebrate their birthday today. Remember to send your congratulations!`
                            message.data.url = `https://birthday-buddy.vercel.app/`
                        }

                        admin.messaging().send(message)
                            .then((response) => {
                                // Response is a message ID string.
                                console.log(`Successfully Sent Daily Reminder to: ${user.displayName} -`, response);
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
                            console.log(reminder.time.toDate(), new Date())
                            const message = {
                                data: {
                                    title: "Birthday Reminder",
                                    body: `This is your reminder to wish ${reminder.birthday.name} a happy birthday today. Remember to send your congratulations!`,
                                    url: `https://birthday-buddy.vercel.app/birthday/${reminder.birthday.id}`,
                                },
                                token: user.fcm_token
                            };

                            admin.messaging().send(message)
                                .then((response) => {
                                    // Response is a message ID string.
                                    console.log(`Successfully Sent Birthday Reminder to: ${user.displayName} - `, response);
                                })
                                .catch((error) => {
                                    console.log('Error sending message:', error);
                                });

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
})


