export default {
  setCourses:((state,courses)=> state.courses = courses),

  setCourse:((state,course)=> state.editCourse =course),

  insertCourse:((state,courses) => state.courses = courses),

  setEditedCourse:((state,course) => state.editCourse = course),

  setEditedCourseId: ((state, id) => state.editCourse.id = id),

  resetEditCourse:((state) =>{
    for (const key in state.editCourse) {
      state.editCourse[key] = ''
    }
    delete state.editCourse.id;
  }),
  NewEditCourse: ((state, course) => {
    debugger
    const index = state.courses.findIndex(p => p.id === course.id)
    state.courses.splice(index, 1, course)
  }),


}



