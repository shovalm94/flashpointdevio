
import firebase from "../../middleware/firestore/courses"

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

  getCourses: async ({commit}) => {
    debugger
    let res = await firebase.get({entity: 'courses'})
    debugger

    commit('setCourses', res)
  },

  deleteCourseActions: async ({state,commit}) => {
    debugger
    await firebase.Delete({entity: "courses", id: state.editCourse.id})

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

