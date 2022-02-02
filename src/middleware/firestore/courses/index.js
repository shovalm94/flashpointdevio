import firebaseInstance from '../../firebase'

  function read(options) {
    return firebaseInstance.db().collection(options.path).get()
  }
  function create(options){
    return firebaseInstance.db().collection(options.path).doc(options.id)
      .collection('students').doc(options.uid).set(options.user)
  }
export default {
    read,
    create
}

