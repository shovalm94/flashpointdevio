<template>
  <div>
  <q-page dir="rtl"><br>
    <div class="q-pa-md" style="max-width: 300px">
      <q-input v-model="localCourse.courseName" filled autogrow hint="שם קורס"/>
      <q-input v-model="localCourse.courseDescription" filled autogrow hint="תיאור קורס"/>
      <q-file outlined v-model="localCourse.ImgCourse" label="upload image" hint="תמונת קורס" id="fileUpload">
        <template v-slot:prepend>
          <q-icon name="attach_file"/>
        </template>
      </q-file>
      <q-file outlined value="" v-model="localCourse.imgTeacher" label="upload image" hint="תמונת מרצה">
        <template v-slot:prepend>
          <q-icon name="attach_file"/>
        </template>
      </q-file>
        <q-input v-model="localCourse.TeacherName" filled autogrow hint="שם מרצה"></q-input>
        <q-input v-model="localCourse.logoCourse" filled autogrow hint="לוגו קורס"></q-input>
        <q-btn id="addCourse" @click="insert()"> הוסף קורס</q-btn>
      </div>
    <div>
      <update-course-property-dialog> </update-course-property-dialog>
    </div>
  </q-page>
  </div>

</template>

<script>
import firebase from '../../middleware/storage'
import {mapState, mapMutations, mapActions} from 'vuex'
import UpdateCoursePropertyDialog from "components/CourseComps/UpdateCoursePropertyDialog";
import {date} from 'quasar'

export default {
  name: "creator",
  components: {UpdateCoursePropertyDialog},
  data() {
    return {
      video: [],
      localCourse: {
        ImgCourse: [],
        courseDescription: '',
        courseName: '',
        courseLength: '',
        TimeUpload:new Date(),
        TeacherName:'',
        imgTeacher:[],
        logoCourse:'',
      }
    }
  },
  computed: mapState('courses', ['editCourse']),
  methods: {
    ...mapActions('courses', ['insertCourse']),
    ...mapMutations('courses', ['setEditedCourse', "setEditedCourseId"]),

    async insert() {
      await this.setEditedCourse(this.localCourse)
      debugger
      await this.insertCourse()

    },
 }
}

</script>

<style scoped>
#addCourse{
  color: #1D1D1D;
  background: #1976D2;
}
</style>
