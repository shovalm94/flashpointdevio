import database from "../../middleware/firebase";
import firestore from "src/middleware/firestore/courses/index.js"
export default {

  insertNewChapter: async ({state, commit, rootState}) => {
    console.log(rootState.courses.editedCourseId)
    debugger
    let newChapter = {}
    Object.assign(newChapter, state.newChapter)
    //save in DS
    debugger
       newChapter.id =  (await firestore.insert({entity:`courses/${rootState.courses.editedCourseId}/chapters`, item:newChapter})).id

    //saves in store
    commit('resetNewChapter')
    commit('insertNewChapter', newChapter)
  },


  getChapters: async ({commit, rootState}) => {
    debugger
    const result = await firestore.get({entity: `courses/${rootState.courses.editedCourseId}/chapters`});
    console.log(result)
    commit('setChapters', result)
  },

  getSingleChapter:async ({commit, rootState}, id) =>{
    const newChapter = await firestore.getSingle({entity: `courses/${rootState.courses.editedCourseId}/chapters/`, item:`${id}`})
    commit('setNewChapter', newChapter)
  },

  getLessons:async ({commit, state, rootState})=>{
    for (const chapter of state.chapters) {
      const newChapter = await firestore.getSingle({entity: `courses/${rootState.courses.editedCourseId}/chapters/`, item:`${chapter.id}`})
      commit('setNewChapter', newChapter)
      const lessons = await firestore.get({entity: `courses/${rootState.courses.editedCourseId}/chapters/${chapter.id}/lessons`});
      commit('setLessons', lessons)
      commit('editNewChapter', state.newChapter)
    }
  },



  updateChapter: async ({state, rootState, commit}) => {
    let item = {}
    Object.assign(item, state.newChapter)
    //save in DB
    await firestore.update({entity: `courses/${rootState.courses.editedCourseId}/chapters`, pickedDoc:`${item.id}`, fields:item})
    //saves in store
    commit('resetNewChapter')
    // commit('resetCardId')
    commit('editNewChapter', item)
  },

  deleteChapter: async ({state, rootState, commit}, id) => {
    await firestore.Delete({entity: `courses/${rootState.courses.editedCourseId}/chapters`, id})
    commit('deleteChapter' ,id)
  }


}


