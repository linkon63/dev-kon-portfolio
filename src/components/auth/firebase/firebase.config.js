import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAAX_9alyMbxiUSaLuGY3DeImFSTBsXOFc",
    authDomain: "m-ftht-practiceday.firebaseapp.com",
    projectId: "m-ftht-practiceday",
    storageBucket: "m-ftht-practiceday.appspot.com",
    messagingSenderId: "996034074146",
    appId: "1:996034074146:web:c7dd989e7d070d067d1c7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Address: 14 wellington way ,bow
// Berkeley house 
// Flat: 89
// Post code: E3 4NQ
