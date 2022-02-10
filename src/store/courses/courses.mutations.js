import {date} from "quasar";

export default {
  setCourses:((state,courses)=> state.courses = courses),

  setCourse:((state,course)=> state.editCourse =course),

  setCourseStudents:((state,students)=> state.students = students),

  setCourseStudent:((state,student)=> state.student = student),

  insertCourse:((state,course) =>  state.courses.push(course)),

  setEditedCourse:((state,course) => state.editCourse = course),

  setIdInEditedCourse: ((state, id) => state.editCourse.id = id),

  setEditedCourseId: ((state, id) => state.editedCourseId = id),

  resetEditCourse:((state) =>{
    for (const key in state.editCourse) {
      state.editCourse[key] = ''
    }
    delete state.editCourse.id;
  }),

  updateCourse: ((state, course) => {
    const index = state.courses.findIndex(p => p.id === course.id)
    state.courses.splice(index, 1, course)
  }),

  deleteCourse: ((state, courseId) => {
    const index = state.courses.findIndex(p => p.id === courseId)
    state.courses.splice(index, 1)
  }),


}



