import firebaseInstance from '../../firebase'

  function read(options) {
    return firebaseInstance.db().collection(options.path).get()
  }
  function create(options){
    return firebaseInstance.db().collection(options.col1).doc(options.id)
      .collection(options.col2).doc(window.user.uid).set(options.user)
  }
export default {
    read,
    create,
}

