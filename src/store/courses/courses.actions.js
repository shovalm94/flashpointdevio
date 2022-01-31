import firebase from "../../middleware/firestore/courses"
import {date} from "quasar";

export default /* context */ {


  insertCourse: async ({state, commit}) => {
    console.log(state.editCourse)
    debugger
    // await (database.firebase.firestore().collection('courses').doc().set(state.editCourse))

    let res = (await firebase.insert({entity: 'courses', item: state.editCourse})).id
    console.log(res)
    debugger
    await commit('setEditedCourseId', res)
    debugger
    await commit('insertCourse', state.editCourse)
  },

  getCourses: async ({commit, getters}) => {
    debugger
    let res = await firebase.get({entity: 'courses'})
    commit('setCourses', res)
    // let courses = getters['timeSince']
    // commit('setCourses', courses)

    // commit('setTimeUpload')
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
    await firebase.update({entity: `courses`, pickedDoc: `${item.id}`, fields: item})
    //saves in store
    commit('resetEditCourse')
    commit('NewEditCourse', item)
  },


}

