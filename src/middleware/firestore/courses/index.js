import firebaseInstance from '../../firebase'
import database from "../../firebase";

function insert(options) {
  debugger
  return database.firebase.firestore().collection(`${options.entity}`).add(options.item)
}

function get(options){
  let arr =[]
  debugger
     return firebaseInstance.db().collection(`${options.entity}`).get()
    .then(result =>{
      debugger
      result.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          id: doc.id
        }
        arr.push(obj)
        console.log(obj)
      })
      debugger
      return arr;
    })

}

function update(options) {
  debugger
  return firebaseInstance.db().collection(`${options.entity}`).doc(`${options.pickedDoc}`)
    .update(options.fields)
}

function Delete (options){
  debugger
  return firebaseInstance.db().collection(`${options.entity}`).doc(options.id).delete()

}



export default {
  insert,
  get,
  Delete,
  update
}

