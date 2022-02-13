<template>
  <div style="width: 350px">
    <q-form @submit.prevent.stop="onSubmit()">

      <q-input ref="courseName" v-model="LocalEditCourse.courseName"
               :rules="[ val => val && val.length > 1 || 'Please type course name']"
               label="שם קורס"
               lazy-rules
               type="text"/>

    <q-input ref="courseDescription" v-model="LocalEditCourse.courseDescription"
             :rules="[ val => val && val.length > 1 || 'Please type course name']"
             label="תיאור קורס"
             lazy-rules
             type="text"/>

    <q-file ref="imgCourse" outlined v-model="imgcourse" label="תמונת קורס">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>

    <q-file outlined v-model="teacherImg"
            label="תמונת מורה" id="fileUpload1">
      <template v-slot:prepend>
        <q-icon name="attach_file"/>
      </template>
    </q-file>

<!--    <q-input v-model="LocalEditCourse.logoCourse">לוגו</q-input>-->
    <q-input v-model="LocalEditCourse.TeacherName"
             :rules="[ val => val && val.length > 1 || 'Please type course name']"
             label="שם מורה"
             lazy-rules
             type="text">
    </q-input>


      <q-input v-model="LocalEditCourse.NumberOfStudents"
             :rules="[ val => val && val.length > 1 || 'Please type course name']"
             label="מספר סטודנטים"
             lazy-rules
             type="text">
      </q-input>

      <q-btn class="text-primary" label="עדכן קורס " outline type="submit"/>

      <!--      <q-btn @click="updateCourse"> עדכן קורס</q-btn>-->

    </q-form>
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

    onSubmit() {
      this.$refs.courseName.validate()
      this.$refs.imgTeacher.validate()
      this.$refs.imgCourse.validate()
      this.$refs.courseDescription.validate()
      if (this.$refs.imgTeacher.hasError || this.$refs.imgCourse.hasError || this.$refs.courseName.hasError || this.$refs.courseDescription.hasError) {
        this.formHasError = true
      } else if (this.accept !== true) {
        this.$q.notify({
          message: 'success'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        })
      }
      this.updateCourse()
    },

    async updateCourse() {
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
