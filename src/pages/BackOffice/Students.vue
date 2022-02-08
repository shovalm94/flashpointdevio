<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="min-width: 450px">
  <div class="q-pa-md q-gutter-sm">
    <q-page-sticky position="top-left" :offset="[120, 50]">
        <q-btn color="primary" label="חזור לרשימת הקורסים" @click="exit()" style="width: 350px"/>
    </q-page-sticky>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="student in editCourse.students" class="my-card">
      <q-card-section>
        <q-card-section class="q-pt-none">שם סטודנט: {{ student.fullName }}</q-card-section>
        <q-card-section class="q-pt-none">אימייל: {{ student.email }}</q-card-section>
      </q-card-section>
    </q-card>
  </div>
    </div>
  </q-page>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Students",
  computed: mapState('courses', ['courses', 'editCourse']),

  data(){
    return{
      framework: {
        plugins: [
          'Dialog'
        ]
      },
    }
  },

  methods: {
    exit() {
      this.$router.push(`/backOffice/UpdateCoursePropertyDialog`);
    },
  }

}


</script>

<style scoped>

</style>
