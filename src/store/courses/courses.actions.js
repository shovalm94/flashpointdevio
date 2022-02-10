import firebaseInstance from '../../middleware/firebase';

export default /* context */ {


  getCourses({state, commit}) {
    let courses = []
    return firebaseInstance.db().collection('courses').orderBy('courseNum').limit(5).startAfter(state.coursesList.length).get()
      .then(result => {
        if (result.empty) {
          commit('setGetMore')
          return
        }
        result.docs.forEach(doc => {
          courses.push(doc.data())
        })
        commit('setCourses', courses)
      })
  }
}


