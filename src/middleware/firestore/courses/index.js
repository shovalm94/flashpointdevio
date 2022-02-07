import firebaseInstance from '../../firebase'
import database from '../courses'


function insert(options) {
  debugger
  return firebaseInstance.db().collection(`${options.entity}`).add(options.item)
}

function get(options){
  let arr =[]
  return firebaseInstance.db().collection(`${options.entity}`).get()
    .then(result =>{
      result.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          id: doc.id
        }
        arr.push(obj)
      })
      return arr;
    })
}


function getSingle(options){
  let item = {}
   return firebaseInstance.db().collection(`${options.entity}`).doc(options.item).get()
    .then(result =>{
        item = {
          ...result.data(),
          id: result.id
        }
      return item
      })
    }



function update(options) {
  return firebaseInstance.db().collection(`${options.entity}`).doc(`${options.pickedDoc}`)
    .update(options.fields)
}

function Delete (options){
  return firebaseInstance.db().collection(`${options.entity}`).doc(options.id).delete()
}

export default {
  insert,
  get,
  getSingle,
  update,
  Delete,

}



