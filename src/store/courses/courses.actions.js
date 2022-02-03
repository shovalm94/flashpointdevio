import firebase from "../../middleware/firestore/courses"
import moment from 'moment';

export default /* context */ {

  insertCourse: async ({state, commit}) => {
    let res = (await firebase.insert({entity: 'courses', item: state.editCourse})).id
    console.log(res)
    await commit('setEditedCourseId', res)
    await commit('insertCourse', state.editCourse)
  },

  getCourses: async ({commit}) => {
    let res = await firebase.get({entity: 'courses'})
    for (const course of res) {
      course.TimeAgo = moment(course.TimeUploaded).fromNow();
      debugger
      if (await firebase.get({entity: `courses/${course.id}/students`})) {
        debugger
        const students = await firebase.get({entity: `courses/${course.id}/students`})
        course.students = students
        course.NumberOfStudents = 0
        for (let i = 0; i < course.students.length; i++) {
          debugger
          course.NumberOfStudents += 1;
        }
      }
    }
    commit('setCourses', res)
  },

  deleteCourseActions: async ({state, commit}, id) => {
    debugger
    await firebase.Delete({entity: "courses", id})
    commit('deleteCourse', id)
  },

  updateCourseActions: async ({state, commit}) => {
    let item = {}
    Object.assign(item, state.editCourse)
    //save in DB
    debugger
    await firebase.update({entity: `courses`, pickedDoc: item.id, fields: item})
    //saves in store
    commit('resetEditCourse')
    commit('updateCourse', item)
  },


}

