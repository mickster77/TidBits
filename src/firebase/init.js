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

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
// export let db = firebaseApp.firestore(), storage = firebaseApp.storage()
