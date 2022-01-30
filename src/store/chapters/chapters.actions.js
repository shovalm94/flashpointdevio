import database from "../../middleware/firebase";
import firestore from "src/middleware/firestore/courses/index.js"
export default {

  insertNewChapter: async ({state, commit}) => {
    let newChapter = {}
    Object.assign(newChapter, state.newChapter)
    //save in DS
       newChapter.id =  (await firestore.insert({entity:`courses/amAEfkzpExJvhHzChmXs/chapters`, item:{newChapter}})).id

    //saves in store
    commit('resetNewChapter')
    commit('insertNewChapter', newChapter)
  },


  getChapters: async ({commit}) => {
    const result = await firestore.get({entity: `courses/amAEfkzpExJvhHzChmXs/chapters`});
    commit('setChapters', result)
  },

  getSingleChapter:async ({commit}, id) =>{
    const newChapter = await firestore.getSingle({entity: `courses/amAEfkzpExJvhHzChmXs/chapters/`, item:`${id}`})
    commit('setNewChapter', newChapter)
  },

  getLessons:async ({commit, state})=>{
    for (const chapter of state.chapters) {
      const newChapter = await firestore.getSingle({entity: `courses/amAEfkzpExJvhHzChmXs/chapters/`, item:`${chapter.id}`})
      commit('setNewChapter', newChapter)
      const lessons = await firestore.get({entity: `courses/amAEfkzpExJvhHzChmXs/chapters/${chapter.id}/lessons`});
      commit('setLessons', lessons)
      commit('editNewChapter', state.newChapter)
    }
  },



  updateChapter: async ({state, commit}) => {
    let item = {}
    Object.assign(item, state.newChapter)
    //save in DB
    await firestore.update({entity: `courses/amAEfkzpExJvhHzChmXs/chapters`, pickedDoc:`${item.id}`, fields:item})
    //saves in store
    commit('resetNewChapter')
    // commit('resetCardId')
    commit('editNewChapter', item)
  },

  deleteChapter: async ({state}, id) => {
    debugger
    await firestore.Delete({entity: "courses/amAEfkzpExJvhHzChmXs/chapters", id})
  }


}


