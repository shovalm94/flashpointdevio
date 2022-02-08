export default {

  setNewLesson: ((state, localNewLesson) => {
    state.newLesson = localNewLesson
  }),

  setNewLessonId: ((state,localNewLessonId) => {
    state.newLesson.id = localNewLessonId
  }),

  resetLessons: ((state) =>{
    state.lessons = []
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
    state.lessons.push(newLesson)
  }),

  editNewLesson: ((state, lesson) => {
    const index = state.lessons.findIndex(p => p.id === lesson.id)
    state.lessons.splice(index, 1, lesson)
  }),

  deleteLesson: ((state, lessonId) => {
    const index = state.lessons.findIndex(p => p.id === lessonId)
    state.lessons.splice(index, 1)
    for (let i = index ; i < state.lessons.length ; i++) {
      state.lessons[i].index --
    }
  }),

  switchLessonPlaces: ((state, lesson) =>{
    for (let i = lesson.index; i < state.lessons.length ; i++) {
      state.lessons[i].index ++
    }
    state.lessons.splice(lesson.index, 0, lesson)
  }),



}
