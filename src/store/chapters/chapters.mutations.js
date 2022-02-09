import moment from "moment";

export default {

  setNewChapter:((state, localNewChapter) =>{
    state.newChapter = localNewChapter
  }),

  setIndex:((state, index1) =>{
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

  switchChapterPlaces: ((state, chapter) =>{
    for (let i = chapter.index; i < state.chapters.length ; i++) {
      state.chapters[i].index ++
    }
    state.chapters.splice(chapter.index, 0, chapter)
  }),

  setChapters: ((state, Chapters) =>{
    state.chapters = Chapters
  }),

  setLessons: ((state, Lessons) =>{
    state.newChapter.lessons = Lessons
    state.newChapter.lessons.sort(function (a, b) {
      return a.index - b.index;
    });
  }),

  setTimeUpload:((state, newChapter) =>{
    newChapter.TimeUpload = moment(newChapter.TimeUpload).fromNow()
  }),

  editNewChapter: ((state, chapter) => {
    const index = state.chapters.findIndex(p => p.id === chapter.id)
    state.chapters.splice(index, 1, chapter)
  }),

  deleteChapter: ((state, chapterID) => {
    const index = state.chapters.findIndex(p => p.id === chapterID)
    state.chapters.splice(index, 1)
    for (let i = index ; i < state.chapters.length ; i++) {
      state.chapters[i].index --
    }
  }),

}
