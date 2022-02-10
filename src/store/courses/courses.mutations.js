import {date} from "quasar";


export default {
  setCourses: ((state, courses) => state.courses = courses),

  addCourseImage: ((state, url) => state.editCourse.imgCourseUrl = url),

  setCourse: ((state, course) => state.editCourse = course),

  setCourseStudents: ((state, students) => state.students = students),

  setCourseStudent: ((state, student) => state.student = student),

  insertCourseMut: ((state, course) => state.courses.push(course)),

  setEditedCourse: ((state, course) => state.editCourse = course),

  setIdInEditedCourse: ((state, id) => state.editCourse.id = id),

  setUrlImgInEditedCourse: ((state, url) => state.editCourse.imgCourseUrl = url),

  setUrlImgInEditedTeacher: ((state, url) => state.editCourse.ImgTeacherUrl = url),

  setEditedCourseId: ((state, id) => state.editedCourseId = id),

  resetEditCourse: ((state) => {
    for (const key in state.editCourse) {
      state.editCourse[key] = ''
    }
    delete state.editCourse.id;
  }),

  updateCourse: ((state, course) => {
    debugger
    const index = state.courses.findIndex(p => p.id === course.id)
    state.courses.splice(index, 1, course)
  }),

  deleteCourse: ((state, courseId) => {
    debugger
    const index = state.courses.findIndex(p => p.id === courseId)
    state.courses.splice(index, 1)
  }),

  setArrayImgCourse: ((state, img) =>
      state.ImgCourse = img
  ),

  setArrayImgTeacher: ((state, img) =>
      state.ImgTeacher = img
  )


}



