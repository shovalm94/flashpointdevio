<template xmlns:src="http://www.w3.org/1999/html">
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md">
            <q-page-sticky position="top-left" :offset="[18, 18]">
              <div class="q-pa-md q-gutter-sm">
                <q-btn label="add new course" color="primary" @click="inception = true" style="min-width:350px"/>
                <q-dialog v-model="inception">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Add a new course</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                     <div>
                       <Creator></Creator>
                     </div>
                    </q-card-section>
                    <q-card-actions align="right" class="text-primary">
                      <q-btn style="color: #212121" flat label="Close" v-close-popup/>
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </q-page-sticky>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="(course) of courses" class="my-card" style="background-color: darkorange">
      <li><img :src="course.imgCourseUrl" alt="photoCourse" style="width: 300px ; height:300px">
      <img :src="course.imgTeacherUrl" alt="photoTeacher" style="width: 300px ; height:300px"></li>
      <q-card-section>
        <div class="text-h6 player-title"> שם קורס: {{ course.courseName }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">תיאור: {{ course.courseDescription }}</q-card-section>
      <q-card-section class="q-pt-none">הועלה לפני: {{ course.TimeAgo }}</q-card-section>
      <q-card-section class="q-pt-none">מספר סטודנטים בקורס: {{ course.NumberOfStudents }}</q-card-section>
      <q-card-section class="q-pt-none">
        <q-btn @click="deleteCourse(course.id)">מחיקה</q-btn>
        <q-btn @click="showStudents(course)">סטודנטים</q-btn>
        <q-btn @click="updateCourse(course)">צפייה ועדכון</q-btn>
        <q-btn @click="goToCourseChapter(course)">פרקי הקורס</q-btn>
      </q-card-section>
    </q-card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import Creator from "pages/BackOffice/Creator";

export default {
  name: "updateCoursePropertyDialog",
  components: {Creator},
  computed: mapState('courses', ['courses','ImgCourse']),
  data() {
    return {
      index:0,
      inception: false,
      framework: {
        plugins: [
          'Dialog'
        ]
      },
    }
  },
  methods: {

    ...mapMutations('courses', ['setEditedCourseId', 'setCourseStudent', 'resetEditCourse', 'updateCourse', 'setEditedCourse', 'setCourse']),
    ...mapActions('courses', ['getCourses', 'deleteCourseActions', "updateCourseActions"]),

    async deleteCourse(id) {
      await this.setEditedCourseId(id)
      await this.deleteCourseActions(id)
    },

    async updateCourse(course) {
      this.setCourse(course)
      debugger
      this.setEditedCourseId(course.id)
      debugger
      await this.$router.push('/backOffice/singleCourse')
    },

    showStudents(Course) {
      this.setEditedCourse(Course);
      this.$router.push('/backOffice/students')
    },

    goToCourseChapter(course) {
      this.setEditedCourseId(course.id)
      this.setEditedCourse(course);
      this.$router.push(`/backOffice/chapters/${course.id}`);
    },
  },

  created() {
    this.getCourses();
  }
}

</script>

<style scoped>

</style>
