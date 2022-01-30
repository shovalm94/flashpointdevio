import firebaseInstance from '../../firebase'

function createUser(options) {
  return firebaseInstance.db().collection(options.path).doc(options.id).set(options.item)
}
function read(options){
   return firebaseInstance.db().collection(options.path).doc(options.id).get().then(res=>{
     return res.data();
   })
}
function update(options){
  return firebaseInstance.db().collection(options.path).doc(options.id).update(options.item).then()
}
function onUpload(options) {
  return firebaseInstance.db().collection(options.path).doc(options.id).update(options.imageUrl).then()
}

export default {
  createUser,
  read,
  update,
  onUpload
}
