import firebaseInstance from "src/middleware/firebase";
import database from '../../middleware/firestore/auth'
import databaseC from '../../middleware/firestore/courses'
import storage from "../../middleware/storage";


export default {
  getUser: ({commit, state}) => {
    database.read({path: 'users', id: state.userId})
      .then(result => {
        commit('setUser', result)
      });
  },
  getUserCourses:({state,commit})=> {
    databaseC.read({path:'courses'}).then((courses)=>{
      database.readUserCourses({col1:'users',col2:'courses'}).then((userCourses)=>{
        let arr = [];
        courses.docs.forEach(course => {
          userCourses.forEach(userC => {
            if (course.id === userC)
              arr.push(course.data())
          })
        })
        commit('setUserCourses',arr)
      })
    })

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

