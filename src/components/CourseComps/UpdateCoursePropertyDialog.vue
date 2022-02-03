<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="course of courses" class="my-card">
      <img :src="course.imageUrl" alt="">
      <q-card-section>
        <div class="text-h6 player-title"> שם קורס: {{ course.courseName }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">תיאור: {{ course.courseDescription }}</q-card-section>
      <q-card-section class="q-pt-none">הועלה לפני: {{ course.TimeAgo }}</q-card-section>
      <q-card-section class="q-pt-none">מספר סטודנטים בקורס: {{ course.NumberOfStudents }}</q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          <q-btn-dropdown color="green" label="students listed in this course">
            <q-list>
              <q-item clickable v-for="student in (course.students)" v-close-popup
                      @click="studentInfo(course, student)">
                <q-item-section>
                  <q-item-label>{{ student.fullName }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-card-section>
      <q-btn @click="deleteCourse(course.id)">מחיקה</q-btn>
      <q-btn @click="updateCourse(course)">צפייה ועדכון</q-btn>
      <q-btn @click="goToCourseChapter(course)">פרקי הקורס</q-btn>
    </q-card>

  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "updateCoursePropertyDialog",
  computed: mapState('courses', ['courses']),
  data() {
    return {}
  },
  methods: {

    ...mapMutations('courses', ['setEditedCourseId', 'setCourseStudent', 'resetEditCourse', 'NewEditCourse', 'setEditedCourse', 'setCourse']),
    ...mapActions('courses', ['getCourses', 'deleteCourseActions', "updateCourseActions"]),

    async deleteCourse(id) {
      await this.setEditedCourseId(id)
      await this.deleteCourseActions(id)
    },

    async updateCourse(course) {
      debugger
      this.setCourse(course)
      debugger
      this.setEditedCourseId(course.id)
      await this.$router.push('/singleCourse')
      debugger
      // await this.updateCourseActions()

    },

    goToCourseChapter(course) {
      debugger
      this.setEditedCourseId(course.id)
      this.setEditedCourse(course);
      this.$router.push(`Chapters/${course.id}`);
    },

    studentInfo(course, student) {
      debugger
      this.setEditedCourse(course);
      this.setCourseStudent(student);
      // this.$router.push(`/UpdateLesson/${lesson.id}`);
    },

  },

  created() {
    this.getCourses();

  }
}
</script>

<style scoped>

</style>
