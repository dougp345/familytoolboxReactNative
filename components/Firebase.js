import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyA7Og9OWyAemE7CYT4D_4lPuLrXqcIR1zA",
  authDomain: "familytoolbox-57e73.firebaseapp.com",
  databaseURL: "https://familytoolbox-57e73.firebaseio.com",
  projectId: "familytoolbox-57e73",
  storageBucket: "familytoolbox-57e73.appspot.com",
  messagingSenderId: "159411358722"
}

var FirebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = FirebaseApp;
