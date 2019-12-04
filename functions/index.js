const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer');

admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Let's create a callable function

// exports.checkAlias = functions.https.onCall((data, context) => {
//     const ref = admin.firestore().collection('newRequests').doc(data.name)
//     return ref.get().then(doc => {
//         return { unqique: !doc.exists }
//     }).catch(err => {
//         throw new functions.https.HttpsError(err.message)
//     })
// })

exports.newRequestEmail = functions.firestore

    // This function fires whenever a new request is written to firestore "newRequests" collection
    // Tags this function to a new documented created to the "newRequests" collection
    .document('newRequests/{requestId}').onCreate((snap, context) => {

        const data = snap.data();

        const mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "kTravel930@gmail.com",
                pass: "Ktravel1234",
            },
        });

        const mailOptions = {
            from: "kTravel930@gmail.com", // from line
            // Normal emails:
            // to: "kathryn.marshall@navy.mil", // to line
            // cc: "william.bolton@navy.mil",
            bcc: "michael._black@icloud.com",
            // Test emails:
            to: "shit.mail@icloud.com",
            // cc: "michael._black@icloud.com",
            // cc line

            subject: `${data.name} has submitted a new travel request`, // Subject line
            html: `<div>
                    <p>Hi Kay,</p>
                    <p>A new travel request has been submitted.  Below are a few details</p>
                    <p>Name: ${data.name}</p>
                    <p>Depart Date: ${data.departDate}</p>
                    <p>Destination: ${data.placeVisited}</p>
                    <p>Other Travelers: ${data.numberOtherTravelers}</p>
                    <p>Thanks!</>
                    <br>
                    <p>p.s., Let me know if any other information would be useful in this email....</p>
                    </div>`  // html
        };
        mailTransport.sendMail(mailOptions, function (err, info) {
            if (err)
                return { data: err }
            else
                return { data: info };
        });
    });

exports.newRequestEmail = functions.firestore
    // This function fires whenever a  request updated in the  "newRequests" collection
    .document('newRequests/{requestId}').onUpdate((change, context) => {

        let oldData = change.before.data();
        let newData = change.after.data();

        const mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "kTravel930@gmail.com",
                pass: "Ktravel1234",
            },
        });

        const mailOptions = {
            from: "kTravel930@gmail.com", // from line
            // Normal emails:
            // to: "kathryn.marshall@navy.mil", // to line
            // cc: "william.bolton@navy.mil",
            bcc: "michael._black@icloud.com",
            // Test emails:
            to: "shit.mail@icloud.com",
            // cc: "michael._black@icloud.com",
            // cc line

            subject: `${oldData.name} has updated a travel request`, // Subject line
            html: `<div>
                    <p>Hi Kay,</p>
                    <p>A travel request has been modified.  


                    <br>
                    <p>p.s., Let me know if any other information would be useful in this email....</p>
                    </div>`  // html
        };
        mailTransport.sendMail(mailOptions, function (err, info) {
            if (err)
                return { data: err }
            else
                return { data: info };
        });
    });