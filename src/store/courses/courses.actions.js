import database from '../../middleware/firestore/courses'
import databaseAuth from '../../middleware/firestore/auth'

export default {
  getCourses: ({commit,state}) => {
    let courses = [];
    commit('setCourses',{})
     database.read({path: 'courses'})
      .then((result) =>{
        result.docs.forEach(doc => {
          let course = doc.data()
          course.id = doc.id
          courses.push(course)
      })
        commit('setCourses',courses)
      })
  },
  addStudentsToCourses: ({state,rootState}) => {
    let user=rootState.auth.user
    delete user.password
    delete user.passwordRepeat
    user.id=window.user.uid
    database.create({col1:'courses',col2:'students',id:state.courseId,user})
  },
  addCoursesToUser: ({commit, state}) => {
    databaseAuth.create({col1:'users',col2:'courses',id:state.courseId})
  },

}

