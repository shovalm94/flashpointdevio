<template>
  <div style="width: 350px">
    <q-input v-model="LocalEditCourse.courseDescription"> תיאור הקורס</q-input>
    <q-input v-model="LocalEditCourse.courseName">שם הקורס</q-input>
    <q-input v-model="LocalEditCourse.imgTeacher">תמונת מורה</q-input>
    <q-input v-model="LocalEditCourse.imgCourseUrl">תמונת קורס</q-input>
    <q-input v-model="LocalEditCourse.imgTeacherUrl">תמונת קורס</q-input>
    <q-input v-model="LocalEditCourse.courseLength">אורך הקורס</q-input>
    <q-input v-model="LocalEditCourse.logoCourse">לוגו</q-input>
    <q-input v-model="LocalEditCourse.TeacherName">שם המורה</q-input>
    <q-input v-model="LocalEditCourse.NumberOfStudents">שם המורה</q-input>
    <q-btn @click="updateCourse"> עדכן קורס</q-btn>
  </div>

</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "singleCourseShow",
  computed: mapState('courses', ['courses', 'editCourse']),

  data() {
    return {
      LocalEditCourse: {
        students: [],
        imgCourseUrl: '',
        imgTeacherUrl: '',
        courseDescription: '',
        courseName: '',
        courseLength: '',
        TimeUploaded: '',
        TeacherName: '',
        logoCourse: '',
        NumberOfStudents: '',
        courseNum: 0,
        id: ''
      }
    }
  },

  methods: {
    ...mapActions('courses', ['updateCourseActions', "getCourses"]),
    ...mapMutations('courses', ['setEditedCourseId', 'setEditedCourse',]),

    async updateCourse() {
      debugger
      this.setEditedCourse(this.LocalEditCourse);
      debugger
      await this.updateCourseActions()
      await this.$router.push(`/backOffice/UpdateCoursePropertyDialog`)
    }

  },


  created() {
    //avoid reference
    this.LocalEditCourse = {...this.editCourse}
  }
}

</script>

<style scoped>

</style>
