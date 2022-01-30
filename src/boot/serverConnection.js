import firebaseInstance from "../middleware/firebase"
// import VueRouter from 'vue-router';

export default async () => {
  const config =  {
    apiKey: "AIzaSyB1JUA7yl0vwbhD79KL5wIMy8rbJNFYfXA",
    authDomain: "flashpointdevio.firebaseapp.com",
    databaseURL: "https://flashpointdevio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "flashpointdevio",
    storageBucket: "flashpointdevio.appspot.com",
    messagingSenderId: "522725958735",
    appId: "1:522725958735:web:69783ffa377d77db61b63a"
  };

  firebaseInstance.fBInit(config);

  firebaseInstance.firebase.auth().onAuthStateChanged( user => {
    window.user =user
  })
}


