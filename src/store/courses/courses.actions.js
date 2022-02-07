import firebase from "../../middleware/firestore/courses"
import moment from 'moment';

export default /* context */ {

  insertCourse: async ({state, commit}) => {
    debugger
    let res = (await firebase.insert({entity: 'courses', item: state.editCourse})).id
    debugger

    await commit('setEditedCourseId', res)
    await commit('setIdInEditedCourse', res)
    await commit('insertCourse', state.editCourse)
  },

  getCourses: async ({commit}) => {
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
    commit('setCourses', courses)
  },


  deleteCourseActions: async ({state, commit}, id) => {
    await firebase.Delete({entity: "courses", id})
    commit('deleteCourse', id)
  },

  updateCourseActions: async ({state, commit}) => {
    let item = {}
    Object.assign(item, state.editCourse)
    //save in DB
    await firebase.update({entity: `courses`, pickedDoc: item.id, fields:item})
    //saves in store
    commit('resetEditCourse')
    commit('updateCourse', item)
  },

}

