export default {
  setCourses: ((state, courses) => state.coursesList = state.coursesList.concat(courses)),

  setGetMore: ((state) => state.getMore = false),

  setCourseId: ((state, id) => state.courseId = id)

}



