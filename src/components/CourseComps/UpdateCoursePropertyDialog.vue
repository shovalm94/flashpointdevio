<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="course of courses" class="my-card">
      <img :src="course.imageUrl" alt="">
      <q-card-section>
        <div class="text-h6 player-title"> שם קורס: {{ course.courseName }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">תיאור: {{ course.courseDescription }}</q-card-section>
      <q-btn @click="deleteCourse(course.id)">מחיקה</q-btn>
      <q-btn @click="updateCourse(course)">צפייה ועדכון</q-btn>
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

    ...mapMutations('courses', ['setEditedCourseId', 'resetEditCourse', 'NewEditCourse', 'setCourse']),
    ...mapActions('courses', ['getCourses', 'deleteCourseActions', "updateCourseActions"]),

    async deleteCourse(id) {
      await this.setEditedCourseId(id)
      await this.deleteCourseActions()
    },
    async updateCourse(course) {
      debugger
      this.setCourse(course)
      debugger
      this.setEditedCourseId(course.id)
      await this.$router.push('/singleCourse')
      debugger
      // await this.updateCourseActions()

    }
  },

  created() {
    this.getCourses();
  }
}
</script>

<style scoped>

</style>
