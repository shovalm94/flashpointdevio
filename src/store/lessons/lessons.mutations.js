export default {

  setNewLesson: ((state, localNewLesson) => {
    state.newLesson = localNewLesson
  }),

  resetNewLesson: ((state) => {
    for (const key in state.newLesson) {
      state.newLesson[key] = ''
    }
    if (state.newLesson.id) {
      delete state.newLesson.id;
    }
  }),

  insertNewLesson: ((state, newLesson) => {
    state.lessonsv.push(newLesson)
  }),

  editNewLesson: ((state, lesson) => {
    const index = state.lessons.findIndex(p => p.id === lesson.id)
    state.lessons.splice(index, 1, lesson)
  }),
}
