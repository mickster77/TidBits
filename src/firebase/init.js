// npm install firebase --save

import firebase from 'firebase'
// tidbits
const firebaseConfig = {
    apiKey: "AIzaSyCcn6Z_uQZTCHnUoJviWsjEuqfTkrNck3w",
    authDomain: "tidbits-4d95f.firebaseapp.com",
    databaseURL: "https://tidbits-4d95f.firebaseio.com",
    projectId: "tidbits-4d95f",
    storageBucket: "tidbits-4d95f.appspot.com",
    messagingSenderId: "92782906097",
    appId: "1:92782906097:web:445f6f4d5f63d626"
};
// kapoc
// const firebaseConfig = {
//     apiKey: "AIzaSyC2EKNaOAKnJOBWOQt-K2awmImzlOhcxtI",
//     authDomain: "kaypocalypse-8ed43.firebaseapp.com",
//     databaseURL: "https://kaypocalypse-8ed43.firebaseio.com",
//     projectId: "kaypocalypse-8ed43",
//     storageBucket: "kaypocalypse-8ed43.appspot.com",
//     messagingSenderId: "54576683692",
//     appId: "1:54576683692:web:60515a1d5c339e747e5d09"
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()