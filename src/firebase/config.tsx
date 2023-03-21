import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDgtJADpvEmxqY7N7i1YM_PkDcEHPcV7RU",
  authDomain: "note-list-site.firebaseapp.com",
  projectId: "note-list-site",
  storageBucket: "note-list-site.appspot.com",
  messagingSenderId: "973532804323",
  appId: "1:973532804323:web:265ba02f85cd2cf04b81d6"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export { projectFirestore }