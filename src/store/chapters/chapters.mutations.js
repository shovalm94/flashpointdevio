export default {

  setNewChapter:((state, localNewChapter) =>{
    state.newChapter = localNewChapter
  }),

  setIndex:((state, index1) =>{
    debugger
    state.lastChapterIndex = index1
  }),

  resetNewChapter:((state) =>{
    for (const key in state.newChapter) {
      state.newChapter[key] = ''
    }
    delete state.newChapter.id;
  }),

  insertNewChapter:((state, chapter) =>{
    state.chapters.push(chapter)
  }),

  setChapters: ((state, Chapters) =>{
    state.chapters = Chapters
  }),

  setLessons: ((state, Lessons) =>{
    state.newChapter.Lessons = Lessons
  }),


  editNewChapter: ((state, chapter) => {
    const index = state.chapters.findIndex(p => p.id === chapter.id)
    state.chapters.splice(index, 1, chapter)
  }),

  deleteChapter: ((state, chapterID) => {
    const index = state.chapters.findIndex(p => p.id === chapterID)
    state.chapters.splice(index, 1)
  }),

  setOptions: (() => {

  }),


}
