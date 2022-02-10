<template>
  <div style="width: 350px">
    <q-input v-model="LocalEditCourse.courseDescription"> תיאור הקורס</q-input>
    <q-input v-model="LocalEditCourse.courseName">שם הקורס</q-input>

    <q-file outlined v-model="LocalEditCourse.imgCourseUrl"
            label="תמונת קורס" id="fileUpload">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>

    <q-file outlined v-model="LocalEditCourse.ImgTeacherUrl"
            label="תמונת מורה" id="fileUpload">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>

    <q-input v-model="LocalEditCourse.courseLength">אורך הקורס</q-input>
    <q-input v-model="LocalEditCourse.logoCourse">לוגו</q-input>
    <q-input v-model="LocalEditCourse.TeacherName">שם המורה</q-input>
    <q-input v-model="LocalEditCourse.NumberOfStudents">מספר סטודנטים</q-input>
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
        ImgTeacherUrl: '',
        courseDescription: '',
        courseName: '',
        courseLength: '',
        TimeUploaded: '',
        TeacherName: '',
        logoCourse: '',
        NumberOfStudents: '',
        courseNum: 1,
        id: ''
      }
    }
  },

  methods: {
    ...mapActions('courses', ['updateCourseActions', "getCourses"]),
    ...mapMutations('courses', ['setEditedCourseId', 'setEditedCourse',]),

    async updateCourse() {
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
