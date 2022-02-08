import firestore from "src/middleware/firestore/courses";

export default {

  insertNewLesson: async ({commit, state, rootState}) => {
    let newLesson = {}
    Object.assign(newLesson, state.newLesson)
    if (state.newLesson.index === '') {
      let index1 = -1
      for (const lesson of state.lessons) {
        if (lesson.index > index1) {
          index1 = lesson.index
        }
      }
      if (index1 === -1) {
        newLesson.index = 0;
      } else {
        newLesson.index = index1 + 1;
      }
      //save in DS
      newLesson.id = (await firestore.insert({
        entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
        item: newLesson
      })).id
      //saves in store
      commit('resetNewLesson')
      commit('insertNewLesson', newLesson)
    } else if (newLesson.index !== '') {
      newLesson.id = (await firestore.insert({
        entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
        item: newLesson
      })).id
      for (let i = newLesson.index; i < state.lessons.length; i++) {
        await firestore.Delete({entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
          id:state.lessons[i].id})
      }
      await commit('switchLessonPlaces', newLesson)
      for (let i = newLesson.index ; i < state.lessons.length ; i++) {
        await firestore.insert({
          entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
          item: state.lessons[i]})
      }
    }
    // commit('chapters/setTest', null, { root: true })
  },

  getSingleLesson: async ({commit, rootState}, id) => {
    const newLesson = await firestore.getSingle({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
      item: id
    })
    commit('setNewLesson', newLesson)
  },

  deleteLesson: async ({state, rootState, commit}, id) => {
    debugger
    const index = state.lessons.findIndex(p => p.id === id)
    for (let i = index; i < state.lessons.length ; i++) {
      await firestore.Delete({entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
        id:state.lessons[i].id
      })
    }
    debugger
    await commit('deleteLesson', id)
    for (let i = index ; i < state.lessons.length ; i++) {
      debugger
      await firestore.insert({
        entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
        item: state.lessons[i]})
    }
    // await firestore.Delete({
    //   entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
    //   id
    // })
    // commit('deleteLesson', id)
  },

  updateLesson: async ({state, rootState, commit}) => {
    let item = {}
    Object.assign(item, state.newLesson)
    //save in DB
    await firestore.update({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/${rootState.chapters.newChapter.id}/lessons`,
      pickedDoc: item.id,
      fields: item
    })
    //saves in store
    commit('resetNewLesson')
    // commit('resetCardId')
    commit('editNewLesson', item)
  },

}
