import database from "../../middleware/firebase";
import firestore from "src/middleware/firestore/courses/index.js"
export default {

  insertNewChapter: async ({state, commit, rootState}) => {

    console.log(rootState.courses.editedCourseId)
    let newChapter = {}
    Object.assign(newChapter, state.newChapter)
    let index1 = 0
    for (const chapter of state.chapters) {
      if (chapter.index > index1){
        index1 = chapter.index
      }
    }
    newChapter.index = index1+1;
    debugger
    commit('setIndex',index1)
    //save in DS
    newChapter.id =  (await firestore.insert({entity:`courses/${rootState.courses.editedCourseId}/chapters`, item:newChapter})).id
    //saves in store
    commit('resetNewChapter')
    commit('insertNewChapter', newChapter)
  },


  getChapters: async ({commit, state, rootState}) => {
    const result = await firestore.get({entity: `courses/${rootState.courses.editedCourseId}/chapters`});
    result.sort(function(a, b) {
      return a.index - b.index;
    });
    commit('setChapters', result)
  },

  getSingleChapter:async ({commit, rootState}, id) =>{
    const newChapter = await firestore.getSingle({entity: `courses/${rootState.courses.editedCourseId}/chapters/`, item:`${id}`})
    commit('setNewChapter', newChapter)
  },

  getLessons:async ({commit, state, rootState})=>{
    for (const chapter of state.chapters) {
      const newChapter = await firestore.getSingle({entity: `courses/${rootState.courses.editedCourseId}/chapters/`, item:chapter.id})
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
    await firestore.update({entity: `courses/${rootState.courses.editedCourseId}/chapters`, pickedDoc:item.id, fields:item})
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


