import firebaseInstance from "src/middleware/firebase";


function uploadToStorage(userId, fileData) {
  return firebaseInstance.firebase.storage().ref('profiles').child(userId).put(fileData)
    .then(snapshot => snapshot.ref.getDownloadURL())
}

export default {
  uploadToStorage

}

