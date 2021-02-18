import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDPbO3FjYvP9BxbaA7Tqk8tble7SMdDMv0",
    authDomain: "hasala-tech.firebaseapp.com",
    projectId: "hasala-tech",
    storageBucket: "hasala-tech.appspot.com",
    messagingSenderId: "747778121618",
    appId: "1:747778121618:web:a06923691151a7f8886b4b"
};

firebase.initializeApp(firebaseConfig)

const firestoreProject = firebase.firestore()

export { firestoreProject }