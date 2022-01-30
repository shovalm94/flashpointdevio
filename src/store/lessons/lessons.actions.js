import firestore from "src/middleware/firestore/courses";

export default {

  insertNewLesson: async ({commit, state}) => {
    debugger
    let newLesson = {}
    Object.assign(newLesson, state.newLesson)
    //save in DS
    newLesson.id = (await firestore.insert({
      entity: `courses/amAEfkzpExJvhHzChmXs/chapters/gjK2UjBEO8gKoTJvDvsD/lessons`,
      item:newLesson
    })).id
    debugger
    commit('resetNewLesson')
    commit('insertNewLesson', newLesson)
  },

  getSingleLesson:async ({commit}, id) =>{
    const newLesson = await firestore.getSingle({entity: `courses/amAEfkzpExJvhHzChmXs/chapters/gjK2UjBEO8gKoTJvDvsD/lessons`, item:`${id}`})
    commit('setNewLesson', newLesson)
  },

  deleteLesson: async ({state}, id) => {
    debugger
    await firestore.Delete({entity: "courses/amAEfkzpExJvhHzChmXs/chapters/gjK2UjBEO8gKoTJvDvsD/lessons", id})
  },

  updateLesson: async ({state, commit}) => {
    let item = {}
    Object.assign(item, state.newLesson)
    //save in DB
    await firestore.update({entity: `courses/amAEfkzpExJvhHzChmXs/chapters/gjK2UjBEO8gKoTJvDvsD/lessons`, pickedDoc:`${item.id}`, fields:item})
    //saves in store
    commit('resetNewLesson')
    // commit('resetCardId')
    commit('editNewLesson', item)
  },

}
