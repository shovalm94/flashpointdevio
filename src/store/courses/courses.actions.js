import firebase from "../../middleware/firestore/courses"
import firestore from "../../middleware/storage/index"
import moment from 'moment';
import firebaseFiles from "src/middleware/storage";
import firebaseInstance from '../../middleware/firebase';
import databaseAuth from '../../middleware/firestore/auth'
import databaseC from '../../middleware/firestore/courses'
export default /* context */ {

  insertCourse: async ({state, commit}) => {
    if (state.editCourse.index === '') {
      let index1 = -1
      for (const course of state.courses) {
        if (course.index > index1) {
          index1 = course.index
        }
      }
      if (index1 === -1) {
        state.editCourse.index = 0;
      } else {
        state.editCourse.index = index1 + 1;
      }
      let res = (await firebase.insert({entity: 'courses', item: state.editCourse})).id
      await commit('setEditedCourseId', res)
      await commit('setIdInEditedCourse', res)
    }},

  getCoursesBackOffice: async ({commit}) => {
    //check course data
    let courses = await firebase.get({entity: 'courses'})
    for (const course of courses) {
      course.TimeAgo = moment(course.TimeUploaded).fromNow();
      if (await firebase.get({entity: `courses/${course.id}/students`})) {
        const students = await firebase.get({entity: `courses/${course.id}/students`})
        course.students = students
        course.NumberOfStudents = 0
        for (let i = 0; i < course.students.length; i++) {
          course.NumberOfStudents += 1;
        }
      }
    }
    commit('setCoursesBackOffice', courses)
  },


  deleteCourseActions: async ({state, commit}, id) => {

    const index = state.courses.findIndex(p => p.id === id)
    await firebase.Delete({entity: "courses", id})
    for (let i = index+1 ; i < state.courses.length ; i++) {
       await firebase.update({
        entity: `courses`,
        pickedDoc: state.courses[i].id,
        fields: {index: i-1}
      })
    }
    await firestore.imgDelete({path: `course/${id}`})
    await firestore.imgDelete({path: `Teacher/${id}`})
     commit('deleteCourse', id)
     commit('deleteCourseStep2', index)
  },


  updateCourseActions: async ({state, commit}) => {
    let item = {}
    Object.assign(item, state.editCourse)
    if(state.courseImgFlag === true){
      await firestore.imgDelete({path: `course/${state.editCourse.id}`})
      commit('CourseImgFlag')
    }
    if(state.teacherImgFlag === true){
      await firestore.imgDelete({path: `Teacher/${state.editCourse.id}`})
      commit('TeacherImgFlag')
      }
    let urlCourse = await firebaseFiles.onUpload(state.ImgCourse, "course", state.editCourse.id);
    await commit("setUrlImgInEditedCourse", urlCourse)
    item.imgCourseUrl = urlCourse

    let urlTeacher = await firebaseFiles.onUpload(state.ImgTeacher, "Teacher", state.editCourse.id);
    await commit("setUrlImgInEditedTeacher", urlTeacher)
    item.imgTeacherUrl = urlTeacher
    await firebase.update({entity: `courses`, pickedDoc: item.id, fields: item})
    commit('resetEditCourse')
    commit('updateCourse', item)
  },


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

