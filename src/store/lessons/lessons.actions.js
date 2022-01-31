import firestore from "src/middleware/firestore/courses";

export default {

  insertNewLesson: async ({commit, state, rootState}) => {
    debugger
    let newLesson = {}
    Object.assign(newLesson, state.newLesson)
    //save in DS
    newLesson.id = (await firestore.insert({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
      item: newLesson
    })).id
    debugger
    commit('resetNewLesson')
    commit('insertNewLesson', newLesson)
  },

  getSingleLesson: async ({commit, rootState}, id) => {
    const newLesson = await firestore.getSingle({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
      item: `${id}`
    })
    debugger
    commit('setNewLesson', newLesson)
    debugger
  },

  deleteLesson: async ({state, rootState, commit}, id) => {
    await firestore.Delete({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
      id
    })
    commit('deleteLesson', id)
  },

  updateLesson: async ({state, rootState, commit}) => {
    let item = {}
    Object.assign(item, state.newLesson)
    //save in DB
    await firestore.update({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
      pickedDoc: `${item.id}`,
      fields: item
    })
    //saves in store
    commit('resetNewLesson')
    // commit('resetCardId')
    commit('editNewLesson', item)
  },

}
