import firebaseInstance from '../../middleware/firebase';

export default /* context */ {


  getCourses({state, commit}) {
    let courses = []
    let lastBatch = []
    if (this.coursesList) {
      firebaseInstance.db().collection('courses').limit(5).get()
        .then(result => {
          result.docs.forEach(doc => {
            courses.push(doc.data())
            lastBatch.push(doc.data())
          })
          commit('setCourses', courses)
        })
    }
    else {
     return  firebaseInstance.db().collection('courses').orderBy('courseName').limit(5).startAfter(state.coursesList.length).get()
        .then(result => {
          console.log(state.coursesList)
          debugger
          result.docs.forEach(doc => {
            courses.push(doc.data())
          })
          commit('setLastBatch')
          commit('setCourses', courses)

        })
    }
  }
}


//   updateList({state, commit}) {
//     let courses = []
//     firebaseInstance.db().collection('courses').orderBy('courses').limit(5).startAfter(state.coursesList.length).get()
//       .then(result => {
//         result.docs.forEach(doc => {
//           courses.push(doc.data())
//         })
//         commit('setNextBatch', courses)
//       })
//
//   }
//
//
// }

