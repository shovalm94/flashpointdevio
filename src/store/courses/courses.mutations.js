import {date} from "quasar";


export default {

  setCourses: ((state, courses) => state.coursesList = state.coursesList.concat(courses)),

  setGetMore: ((state) => state.getMore = false),

  setCourseId: ((state, id) => state.courseId = id),

  setCoursesBackOffice: ((state, courses) => {
    state.courses = courses
    state.courses.sort(function (a, b) {
      return a.index - b.index;
    });
  }),

  addCourseImage: ((state, url) => state.editCourse.imgCourseUrl = url),

  setCourse: ((state, course) => state.editCourse = course),

  setCourseStudents: ((state, students) => state.students = students),

  setCourseStudent: ((state, student) => state.student = student),

  insertCourseMut: ((state, course) => state.courses.push(course)),

  setEditedCourse: ((state, course) => {state.editCourse = course
  state.courses.sort(function (a, b) {
    return a.index - b.index;
  })}),

  setIdInEditedCourse: ((state, id) => state.editCourse.id = id),

  setUrlImgInEditedCourse: ((state, url) => state.editCourse.imgCourseUrl = url),

  setUrlImgInEditedTeacher: ((state, url) => state.editCourse.imgTeacherUrl = url),

  setEditedCourseId: ((state, id) => state.editedCourseId = id),

  resetEditCourse: ((state) => {
    for (const key in state.editCourse) {
      state.editCourse[key] = ''
    }
    delete state.editCourse.id;
  }),

  updateCourse: ((state, course) => {
    const index = state.courses.findIndex(p => p.id === course.id)
    state.courses.splice(index, 1, course)
  }),

  deleteCourse: ((state, id) => {
    state.courses.sort(function (a, b) {
      return a.index- b.index;
    });
    debugger
    const index = state.courses.findIndex(p => p.id === id)
    state.courses.splice(index, 1)
  }),

  deleteCourseStep2: ((state, index) => {
    debugger
    for (let i = index ; i < state.courses.length ; i++) {
      state.courses[i].index--
    }
  }),

  setArrayImgCourse: ((state, img) =>
      state.ImgCourse = img
  ),

  setArrayImgTeacher: ((state, img) =>
      state.ImgTeacher = img
  ),

  CourseImgFlag: ((state) => {
    if (state.courseImgFlag === false) {
      state.courseImgFlag = true
    }
    else state.courseImgFlag = false
  }),

  TeacherImgFlag: ((state) => {
    if (state.teacherImgFlag === false) {
      state.teacherImgFlag = true
    }
    else state.teacherImgFlag = false
  }),

  switchCoursePlaces: ((state, course) =>{
    for (let i = course.index; i < state.courses.length ; i++) {
      state.courses[i].index ++
    }
    state.courses.splice(course.index, 0, course)
  }),

  sortByIndex: ((state)=>{
    state.courses.sort(function (a, b) {
      return a.index- b.index;
    });
  })
}



