import firebaseInstance from '../../middleware/firebase';
import databaseAuth from '../../middleware/firestore/auth'
import databaseC from '../../middleware/firestore/courses'
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
          let course = doc.data()
          course.id = doc.id
          courses.push(course)
        })
        commit('setCourses', courses)

      })
  },
  addStudentsToCourses: ({state, rootState}) => {
    let user = rootState.auth.user
    delete user.password
    delete user.passwordRepeat
    user.id = window.user.uid
    databaseC.create({col1: 'courses', col2: 'students', id: state.courseId, user})
  },
  addCoursesToUser: ({commit, state}) => {
    databaseAuth.create({col1: 'users', col2: 'courses', id: state.courseId})
  },

}

