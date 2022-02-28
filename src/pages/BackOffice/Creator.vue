<template>
  <div>
    <q-form @submit.prevent.stop="onSubmit()">
      <q-page dir="rtl"><br>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input ref="courseName" v-model="localCourse.courseName"
                   :rules="[ val => val && val.length > 1 || 'Please type course name']"
                   label="שם קורס"
                   lazy-rules
                   type="text"/>

          <q-input ref="description" v-model="localCourse.courseDescription"
                   :rules="[ val => val && val.length > 1 || 'Please type description']"
                   label="תיאור קורס"
                   lazy-rules
                   type="text"/>

          <q-file outlined v-model="ImgCourse"
                  label="תמונת קורס" id="fileUpload">
            <template v-slot:prepend>
              <q-icon name="attach_file"/>
            </template>
          </q-file>

          <q-file outlined v-model="ImgTeacher" label="תמונת מרצה">
            <template v-slot:prepend>
              <q-icon name="attach_file"/>
            </template>
          </q-file>

          <q-input ref="teacherName" v-model="localCourse.TeacherName"
                   :rules="[ val => val && val.length > 1 || 'Please type a name']"
                   label="שם מרצה"
                   lazy-rules
                   type="text"></q-input>

          <q-select outlined v-model="localCourse.index" :options="indexForScroll()"
                    label="מספר הקורס (בברירת מחדל יכנס כשיעור האחרון)"/>

          <q-btn class="text-primary" label="הוסף קורס" outline type="submit" v-close-popup/>
        </div>
      </q-page>
    </q-form>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import UpdateCoursePropertyDialog from "./UpdateCoursePropertyDialog";
import firebaseFiles from "../../middleware/storage/index"
import firestore from "../../middleware/firestore/courses/index"

export default {
  name: "creator",
  components: {UpdateCoursePropertyDialog},
  data() {
    return {
      ImgCourse: [],
      ImgTeacher: [],

      localCourse: {
        imgCourseUrl: '',
        imgTeacherUrl: '',
        courseDescription: '',
        courseName: '',
        courseLength: '',
        TimeUploaded: new Date().toString(),
        TeacherName: '',
        logoCourse: '',
        NumberOfStudents: 0,
        id: '',
        index: '',
        students: []
      }
    }
  },
  computed: mapState('courses', ['editCourse', 'editedCourseId', 'courses']),
  methods: {
    ...mapActions('courses', ['insertCourse']),
    ...mapMutations('courses', ['setUrlImgInEditedTeacher', 'insertCourseMut', 'setEditedCourse', 'setEditedCourseId', 'addCourseImage', 'setUrlImgInEditedCourse']),
    onSubmit() {
      this.$refs.courseName.validate()
      this.$refs.description.validate()
      this.$refs.teacherName.validate()
      if (this.$refs.courseName.hasError || this.$refs.teacherName.hasError || this.$refs.description.hasError) {
        this.formHasError = true
      } else if (this.accept !== true) {
        this.$q.notify({
          message: 'success. please wait a few seconds for the course to load'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        })
      }
      this.insert()

    },

    async insert() {
      await this.setEditedCourse(this.localCourse)
      await this.insertCourse()
      let urlCourse = await this.upload(this.ImgCourse, "course", this.editCourse.id)
      await this.setUrlImgInEditedCourse(urlCourse)
      await firestore.update({
        entity: 'courses',
        pickedDoc: this.editCourse.id,
        fields: {imgCourseUrl: this.editCourse.imgCourseUrl}
      })
      let urlTeacher = await this.upload(this.ImgTeacher, "Teacher", this.editCourse.id)
      await this.setUrlImgInEditedTeacher(urlTeacher)
      await firestore.update({
        entity: 'courses',
        pickedDoc: this.editCourse.id,
        fields: {imgTeacherUrl: this.editCourse.imgTeacherUrl}
      })
       this.insertCourseMut(this.editCourse)
    },


    async upload(img, path, Id) {
      debugger
      let url = await firebaseFiles.onUpload(img, path, Id);
      return url
    },

    indexForScroll() {
      let arr = []
      for (let course of this.courses) {
          arr.push(course.index)
      }
      return arr
    },


  }
}

</script>

<style scoped>

#addCourse {
  color: #1D1D1D;
  background: #1976D2;
}
</style>








