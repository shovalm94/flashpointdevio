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

          <q-file outlined v-model="localCourse.ImgCourse"
                  label="תמונת קורס" id="fileUpload">
            <template v-slot:prepend>
              <q-icon name="attach_file"/>
            </template>
          </q-file>

          <!--          <q-file outlined v-model="localCourse.imgTeacher" label="תמונת מרצה">-->
          <!--            <template v-slot:prepend>-->
          <!--              <q-icon name="attach_file"/>-->
          <!--            </template>-->
          <!--          </q-file>-->

          <q-input ref="teacherName" v-model="localCourse.TeacherName"
                   :rules="[ val => val && val.length > 1 || 'Please type a name']"
                   label="שם מרצה"
                   lazy-rules
                   type="text"></q-input>

          <q-input v-model="localCourse.logoCourse" label="לוגו"></q-input>
          <q-btn class="text-primary" label="הוסף קורס" outline type="submit"/>
        </div>
        <div>
          <update-course-property-dialog></update-course-property-dialog>
        </div>
      </q-page>

    </q-form>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import UpdateCoursePropertyDialog from "./UpdateCoursePropertyDialog";
import firebaseFiles from "../../middleware/storage/index"

export default {
  name: "creator",
  components: {UpdateCoursePropertyDialog},
  data() {
    return {
      ImgCourse: [],
      imgTeacher: [],
      localCourse: {
        courseDescription: '',
        courseName: '',
        courseLength: '',
        TimeUploaded: new Date().toString(),
        TeacherName: '',
        logoCourse: '',
        NumberOfStudents: 0,
        students: []
      }
    }
  },
  computed: mapState('courses', ['editCourse']),
  methods: {
    ...mapActions('courses', ['insertCourse']),
    ...mapMutations('courses', ['setEditedCourse', 'setEditedCourseId']),
    onSubmit() {
      console.log(this.localCourse.courseName)
      this.$refs.courseName.validate()
      this.$refs.description.validate()
      this.$refs.teacherName.validate()
      debugger
      if (this.$refs.courseName.hasError || this.$refs.teacherName.hasError || this.$refs.description.hasError) {
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
      this.insert()
    },

    async insert() {
      await this.setEditedCourse(this.localCourse)
      await this.insertCourse()
      await this.upload('courses',this.localCourse.ImgCourse)
    },
    async upload(path, img) {
      debugger
      await firebaseFiles.onUpload(img, path);
      debugger
    }
  }
}

</script>

<style scoped>
#addCourse {
  color: #1D1D1D;
  background: #1976D2;
}
</style>








