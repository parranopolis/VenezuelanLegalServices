// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGzIC2Gd_9GjA9JUYQALSSmMLmkzpma9c",
    authDomain: "venezuelanlegalservices-e3fa2.firebaseapp.com",
    databaseURL: "https://venezuelanlegalservices-e3fa2-default-rtdb.firebaseio.com",
    projectId: "venezuelanlegalservices-e3fa2",
    storageBucket: "venezuelanlegalservices-e3fa2.firebasestorage.app",
    messagingSenderId: "411136222789",
    appId: "1:411136222789:web:774d5127598fffbf1ea52c",
    measurementId: "G-1RQLZ20SNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);