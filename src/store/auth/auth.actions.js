import firebaseInstance from "src/middleware/firebase";
import database from '../../middleware/firestore/auth'
import storage from "../../middleware/storage";


export default {
  getUser: ({commit, state}) => {
    database.read({path: 'users', id: state.userId})
      .then(result => {
        commit('setUser', result)
      });
  },
  updateUser: ({commit, state}, item) => {
    firebaseInstance.firebase.auth().currentUser.updateEmail(item.email).then(() => {
    }).catch(e => console.log(e));
    database.update({path: 'users', id: state.userId, item})
      commit('setUser', item)
  },
  upload: ({state, commit}, fileData) => {
    storage.uploadToStorage(state.userId,fileData)
      .then((imgUrl) => {
        database.update({path: 'users',id:state.userId, item: {imgUrl}}).then(() => {
          commit('setUserImage', imgUrl)
        }).catch(e => console.log(e));
      })
  },
  delete:({state,commit})=>{
    database.deleteFromAuth()
  }


}

