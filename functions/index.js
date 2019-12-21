const functions = require('firebase-functions');
const admin = require('firebase-admin')
const nodemailer = require('nodemailer');

admin.initializeApp()


// This function fires whenever a new request is written to firestore "newRequests" collection
// Tags this function to a new documented created to the "newRequests" collection

exports.newRequestEmail = functions.firestore.document('newRequests/{requestId}').onCreate((snap, context) => {

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
        to: "kathryn.marshall@navy.mil",
        cc: ["william.bolton@navy.mil", data.userEmail],
        bcc: "michael._black@icloud.com",
        // Test emails:
        // to: "michael._black@icloud.com",
        subject: `${data.name} has submitted a new travel request`, // Subject line
        html: `<div>
                    <p>Hi Kay,</p>
                    <p>A new travel request has been submitted.  Below are a few details</p>
                    <p>Name: ${data.name}</p>
                    <p>ID: ${snap.id}</p>
                    <p>Depart Date: ${data.departDate}</p>
                    <p>Destination: ${data.placeVisited}</p>
                    <p>Other Travelers: ${data.numberOtherTravelers}</p>
                    <p>Transportation Mode: ${data.tranportationMode}</p>
                    <p>Hotel Needed?: ${data.hotel}</p>
                    <p>Thanks!</>
                    <br>
                    <p>p.s., Let me know if any other information would be useful in this email....</p>
                    </div>`  // html
    };
    mailTransport.sendMail(mailOptions, (err, info) => {
        if (err)
            return { data: err }
        else
            return { data: info };
    });
});

// This function fires whenever a request updated in the  "newRequests" collection
exports.updateRequestEmail = functions.firestore.document('newRequests/{requestId}').onUpdate((change, context) => {

    let oldData = change.before.data();
    let newData = change.after.data();
    let oldStr = JSON.stringify(oldData, null, 4)
    let newStr = JSON.stringify(newData, null, 4)
    let myArray = []
    for (key in oldData) {
        if (oldData[key] !== newData[key]) {
            myArray.push(key)
            myArray.push("Old Value:  " + oldData[key])
            myArray.push("New Value:  " + newData[key])
        }
    }

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
        to: "kathryn.marshall@navy.mil",
        cc: ["william.bolton@navy.mil", newData.userEmail],
        bcc: "michael._black@icloud.com",
        // Test emails:
        // to: "michael._black@icloud.com",
        // cc: "michael._black@icloud.com",

        subject: `${oldData.name} has updated a travel request`, // Subject line
        html: `<div>
                    <p>Hi Kay,</p>
                    <p>A travel request has been modified.  
                    <p> ${oldData.name}, please email Kay (and cc William) with the detials of what changed!!!</p>
                    <p>ID: ${snap.id}</p>
                    <p> Below is my best shot at the changes: </p>
                    <p>${myArray}</p>
                    </div>`  // html
    };
    mailTransport.sendMail(mailOptions, (err, info) => {
        if (err)
            return { data: err }
        else
            return { data: info };
    });
});

// This function fires whenever a  request is deleted from the  firestore "newRequests" collection
exports.deleteRequestEmail = functions.firestore.document('newRequests/{requestId}').onDelete((snap, context) => {

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
        to: "kathryn.marshall@navy.mil",
        cc: ["william.bolton@navy.mil", data.userEmail],
        bcc: "michael._black@icloud.com",
        // Test emails:
        // to: "michael._black@icloud.com",
        subject: `${data.name} has deleted a travel request`, // Subject line
        html: `<div>
                    <p>Hi Kay,</p>
                    <p>A travel request has been deleted.  Below are a few details</p>
                    <p>Name: ${data.name}</p>
                    <p>ID: ${snap.id}</p>
                    <p>Depart Date: ${data.departDate}</p>
                    <p>Destination: ${data.placeVisited}</p>
                    <p>Other Travelers: ${data.numberOtherTravelers}</p>
                    <p>Transportation Mode: ${data.tranportationMode}</p>
                    <p>Hotel Needed?: ${data.hotel}</p>
                    <p>I hope this was not an accident...</>
                    <br>
                    <p>p.s., Let me know if any other information would be useful in this email....</p>
                    </div>`  // html
    };
    mailTransport.sendMail(mailOptions, (err, info) => {
        if (err)
            return { data: err }
        else
            return { data: info };
    });
});

exports.sendAngryEmail = functions.https.onCall((data, context) => {
    // ...
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
        to: ["kathryn.marshall@navy.mil", data.userEmail],
        cc: "william.bolton@navy.mil",
        bcc: "michael._black@icloud.com",
        // Test emails:
        // to: "michael._black@icloud.com",
        // cc: data.email,
        subject: `Travel Claim Needed`, // Subject line
        html: `<div>
                    <p>Hi ${data.name}</p>
                    <p>Can you please submit your travel voucher for your recent trip to ${data.destination}?</p>
                     <p>Thanks!</p>
                    </div>`  // html
    };
    mailTransport.sendMail(mailOptions, (err, info) => {
        if (err)
            return { data: err }
        else
            return { data: info };
    });
})