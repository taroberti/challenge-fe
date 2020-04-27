import firebase from 'firebase/app';
import 'firebase/auth';

import FIREBASE_CONFIG from '../../config/firebaseConfig.js';
 
class Firebase {
  constructor() {
    firebase.initializeApp(FIREBASE_CONFIG);

    this.auth = firebase.auth();
  }

  doSignIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}
export default Firebase;