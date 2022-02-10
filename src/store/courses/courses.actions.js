import firebase from "../../middleware/firestore/courses"
import firestore from "../../middleware/storage/index"
import moment from 'moment';
import firebaseFiles from "src/middleware/storage";

export default /* context */ {

  insertCourse: async ({state, commit}) => {
    let res = (await firebase.insert({entity: 'courses', item: state.editCourse})).id
    await commit('setEditedCourseId', res)
    await commit('setIdInEditedCourse', res)
  },

  getCourses: async ({commit}) => {
    //check course data
    let courses = await firebase.get({entity: 'courses'})
    for (const course of courses) {
      course.TimeAgo = moment(course.TimeUploaded).fromNow();
      if (await firebase.get({entity: `courses/${course.id}/students`})) {
        const students = await firebase.get({entity: `courses/${course.id}/students`})
        course.students = students
        course.NumberOfStudents = 0
        for (let i = 0; i < course.students.length; i++) {
          course.NumberOfStudents += 1;
        }
      }
    }
    commit('setCourses', courses)
  },


  deleteCourseActions: async ({state, commit}, id) => {
    await firebase.Delete({entity: "courses", id})
    debugger
    await firestore.imgDelete({path: `course/${id}`})
    await firestore.imgDelete({path: `Teacher/${id}`})
    debugger
    commit('deleteCourse', id)
  },

  updateCourseActions: async ({state, commit}) => {
    let item = {}
    Object.assign(item, state.editCourse)
    //save in DB
    await firestore.imgDelete({path: `course/${state.editCourse.id}`})
    await firestore.imgDelete({path: `Teacher/${state.editCourse.id}`})
    console.log(state.ImgCourse,"image111")
    console.log(state.editCourse.id,"id")
    debugger
    let urlCourse = await this.upload(state.ImgCourse, "course", state.editCourse.id)
    debugger
    await commit("setUrlImgInEditedCourse", urlCourse)

    let urlTeacher = await this.upload(state.ImgTeacher, "Teacher", state.editCourse.id)
    await commit("setUrlImgInEditedTeacher", urlTeacher)

    item.imgCourseUrl = urlCourse

    item.ImgTeacherUrl = urlTeacher
    debugger
    await firebase.update({entity: `courses`, pickedDoc: item.id, fields: item})
    //saves in store
    commit('resetEditCourse')
    commit('updateCourse', item)
  },
  async upload(img, path, Id) {
    debugger
    let url = await firebaseFiles.onUpload(img, path, Id);
    return url
  }

}

