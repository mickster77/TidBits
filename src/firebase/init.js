// npm install firebase --save

import firebase from 'firebase'
import firestore from 'firebase/firestore'

// const firebaseConfig = {
//     apiKey: "AIzaSyC2EKNaOAKnJOBWOQt-K2awmImzlOhcxtI",
//     authDomain: "kaypocalypse-8ed43.firebaseapp.com",
//     databaseURL: "https://kaypocalypse-8ed43.firebaseio.com",
//     projectId: "kaypocalypse-8ed43",
//     storageBucket: "kaypocalypse-8ed43.appspot.com",
//     messagingSenderId: "54576683692",
//     appId: "1:54576683692:web:abc777491c43fe11"
// };

// const firebaseConfig = {
//     apiKey: "AIzaSyDwQZRbBEFS2kTR9_3cXDRmQfKv2jHWJac",
//     authDomain: "kaypocolyspe.firebaseapp.com",
//     databaseURL: "https://kaypocolyspe.firebaseio.com",
//     projectId: "kaypocolyspe",
//     storageBucket: "kaypocolyspe.appspot.com",
//     messagingSenderId: "1091967594768",
//     appId: "1:1091967594768:web:b63123917cc62891"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBj_2mnzEKWuUfaaMvsMIAsQ6IrIRb-Euo",
    authDomain: "kaypocalypse-1.firebaseapp.com",
    databaseURL: "https://kaypocalypse-1.firebaseio.com",
    projectId: "kaypocalypse-1",
    storageBucket: "kaypocalypse-1.appspot.com",
    messagingSenderId: "637216143662",
    appId: "1:637216143662:web:298cce8bddf09dbc"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()