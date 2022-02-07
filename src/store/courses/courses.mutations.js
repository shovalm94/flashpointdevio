export default {
  // setCourses: ((state, courses) => state.coursesList = courses),
  setCourses: ((state, courses) => state.coursesList.push(courses)),

  setLastBatch: ((state) => state.lastBatch = true),
  // setLastBatch: ((state, lastBatch) => state.lastBatch = lastBatch),

  // setNextBatch:  ((state, courses) => state.coursesList.concat(courses))



}



