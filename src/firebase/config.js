import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCvg7N8gYYYKgMQs8S-HfjNLUKhlesWtIo",
  authDomain: "avocado-39fdb.firebaseapp.com",
  projectId: "avocado-39fdb",
  storageBucket: "avocado-39fdb.appspot.com",
  messagingSenderId: "256562698779",
  appId: "1:256562698779:web:d350072ebd2175313db6be"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()


const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp, projectStorage }