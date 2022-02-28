import firebase from "firebase";
import firestore from "../firebase"
import {mapState, mapMutations, mapActions} from 'vuex'
import store from '../../store'
import url from "../storage"
import firebaseInstance from "src/middleware/firebase";


function onUpload(image, path, Id) {
  const ref = firebase.storage().ref(path);
  const name = Id;
  const metadata = {
    contentType: image.type
  }
  return ref.child(name).put(image, metadata)
    .then(snapshot => {
      return snapshot.ref.getDownloadURL()
        .then((url) => {
          return url;
        })
    })
    .catch(console.error);
}

function imgDelete(option) {
  debugger
  const storageRef = firebase.storage().ref(`${option.path}`)
  return storageRef.delete()
}

async function updateImg(option) {
  const storageRef = firebase.storage().ref(`${option.path}`)
  return storageRef.put(option.img)
}

function uploadToStorage(userId, fileData) {
  return firebaseInstance.firebase.storage().ref('profiles').child(userId).put(fileData)
    .then(snapshot => snapshot.ref.getDownloadURL())
}

export default {
  ...mapState('courses', ['ImgCourse', 'teacherImg']),
  ...mapMutations('courses', ['addCourseImage']),

  onUpload,
  imgDelete,
  updateImg,
  uploadToStorage

}

