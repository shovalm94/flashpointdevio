import database from "../../middleware/storage";
import firestore from "src/middleware/firestore/courses/index.js"
import moment from "moment";

export default {
  insertNewChapter: async ({state, commit, rootState}) => {
    debugger

    let newChapter = {}
    Object.assign(newChapter, state.newChapter)
    //אם המיקום של הפרק החדש הינו האחרון - ברירת מחדל
    if (state.newChapter.index === '') {
      let index1 = -1
      for (const chapter of state.chapters) {
        if (chapter.index > index1) {
          index1 = chapter.index
        }
      }
      if (index1 === -1) {
        newChapter.index = 0;
      } else {
        newChapter.index = index1 + 1;
      }
      debugger
      //save in DS
      newChapter.id = (await firestore.insert({
        entity: `courses/${rootState.courses.editedCourseId}/chapters`,
        item: newChapter
      })).id

      //saves in store
      commit('resetNewChapter')
      commit('setNewChapter',newChapter)
    }
    //אם המיקום של הפרק החדש הינו מיקום נבחר במיוחד
    else if (newChapter.index !== '') {
      newChapter.id = (await firestore.insert({
        entity: `courses/${rootState.courses.editedCourseId}/chapters`,
        item: newChapter
      })).id
      await commit('switchChapterPlaces', newChapter)
      for (let i = newChapter.index; i < state.chapters.length; i++) {
        await firestore.Delete({
          entity: `courses/${rootState.courses.editedCourseId}/chapters`,
          id: state.chapters[i].id
        })
      }
      for (let i = newChapter.index; i < state.chapters.length; i++) {
        await firestore.insert({
          entity: `courses/${rootState.courses.editedCourseId}/chapters`,
          item: state.chapters[i]
        })
      }
    }

  },


  getChapters: async ({commit, rootState}) => {
    const result = await firestore.get({entity: `courses/${rootState.courses.editedCourseId}/chapters`});
    result.sort(function (a, b) {
      return a.index - b.index;
    });
    commit('setChapters', result)
  },

  getSingleChapter: async ({commit, rootState}, id) => {
    const newChapter = await firestore.getSingle({
      entity: `courses/${rootState.courses.editedCourseId}/chapters/`,
      item: `${id}`
    })
    commit('setNewChapter', newChapter)
  },

  getLessons: async ({commit, state, rootState}) => {
    for (const chapter of state.chapters) {
      let newChapter = await firestore.getSingle({
        entity: `courses/${rootState.courses.editedCourseId}/chapters/`,
        item: chapter.id
      })
      commit('setNewChapter', newChapter)
      const lessons = await firestore.get({entity: `courses/${rootState.courses.editedCourseId}/chapters/${chapter.id}/lessons`});
      commit('setTimeUpload', newChapter)
      commit('setLessons', lessons)
      commit('editNewChapter', state.newChapter)
    }
  },


  updateChapter: async ({state, rootState, commit}) => {
    let item = {}
    Object.assign(item, state.newChapter)
    //save in DB
    await firestore.update({
      entity: `courses/${rootState.courses.editedCourseId}/chapters`,
      pickedDoc: item.id,
      fields: item
    })
    //saves in store
    commit('resetNewChapter')
    commit('editNewChapter', item)
  },

  deleteChapter: async ({state, rootState, commit}, id) => {
    debugger
    await database.imgDelete({path: `chapters/${id}`})
    debugger
    const index = state.chapters.findIndex(p => p.id === id)
    for (let i = index; i < state.chapters.length; i++) {
      await firestore.Delete({entity: `courses/${rootState.courses.editedCourseId}/chapters`, id: state.chapters[i].id})
    }
    await commit('deleteChapter', id)
    for (let i = index; i < state.chapters.length; i++) {
      await firestore.insert({
        entity: `courses/${rootState.courses.editedCourseId}/chapters`,
        item: state.chapters[i]
      })
    }
    debugger


  },

}


