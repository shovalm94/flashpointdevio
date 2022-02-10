import firebase from "firebase";
import firestore from "../firebase"
import {mapState, mapMutations, mapActions} from 'vuex'
import store from '../../store'
import url from "../storage"

function onUpload(image, path, Id) {
  debugger
  const ref = firebase.storage().ref(path);
  const name = Id;
  const metadata = {
    contentType: image.type
  };
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
  console.log(`${option.path}`)
  debugger
  return storageRef.delete()
}


export default {
  ...mapState('courses', ['ImgCourse', 'teacherImg']),
  ...mapMutations('courses', ['addCourseImage']),
  onUpload,
  imgDelete,
}

