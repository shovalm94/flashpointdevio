import firebaseInstance from '../../firebase'

  function read(options) {
    return firebaseInstance.db().collection(options.path).get()
  }
  function create(options){
    return firebaseInstance.db().collection(options.path).doc(options.id)
      .collection('students').doc(options.uid).set(options.user)
      .then(()=>{
          return firebaseInstance.db().collection('users').doc(options.uid).collection('courses')
           .doc(options.id).set({[options.id]:options.id})
      })
  }
export default {
    read,
    create
}

