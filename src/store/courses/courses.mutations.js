import {date} from "quasar";


export default {
  setCourses:((state,courses)=> state.courses = courses),

  setCourse:((state,course)=> state.editCourse =course),

  insertCourse:((state,course) =>  state.courses.push(course)),

  setEditedCourse:((state,course) => state.editCourse = course),

  setEditedCourseId: ((state, id) => state.editedCourseId = id),

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

  deleteCourse: ((state, courseId) => {
    debugger
    const index = state.courses.findIndex(p => p.id === courseId)
    state.courses.splice(index, 1)
  }),


}



