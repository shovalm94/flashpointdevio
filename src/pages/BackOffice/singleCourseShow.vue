<template>
  <div style="width: 350px">
    <q-input v-model="LocalEditCourse.courseName">שם הקורס</q-input>
    <q-input v-model="LocalEditCourse.courseDescription"> תיאור הקורס</q-input>
    <q-file outlined v-model="imgcourse"
            label="תמונת קורס" id="fileUpload">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>

    <q-file outlined v-model="teacherImg"
            label="תמונת מורה" id="fileUpload">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>

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
      imgcourse: [],
      teacherImg: [],
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
        courseNum: 1,
        id: ''
      }
    }
  },

  methods: {
    ...mapActions('courses', ['updateCourseActions', "getCourses"]),
    ...mapMutations('courses', ['setEditedCourseId', 'setEditedCourse', 'setArrayImgCourse', 'setArrayImgTeacher',
      'CourseImgFlag', 'TeacherImgFlag']),

    async updateCourse() {
      debugger
      this.setEditedCourse(this.LocalEditCourse);
      this.setArrayImgCourse(this.imgcourse)
      this.setArrayImgTeacher(this.teacherImg)
      debugger
      await this.updateCourseActions()
      await this.$router.push(`/backOffice/UpdateCoursePropertyDialog`)
    }

  },


  created() {
    if (this.editCourse.imgCourseUrl !== '') {
      this.CourseImgFlag();
    }
    if (this.editCourse.imgTeacherUrl !== '') {
      this.TeacherImgFlag();
    }
    //avoid reference
    this.LocalEditCourse = {...this.editCourse}
  }
}

</script>

<style scoped>

</style>
