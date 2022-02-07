<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="student in editCourse.students" class="my-card">
      <q-card-section>
        <q-card-section class="q-pt-none">שם סטודנט: {{ student.fullName }}</q-card-section>
        <q-card-section class="q-pt-none">אימייל: {{student.email }}</q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Students",
  computed: mapState('courses', ['courses','editCourse']),
}

</script>

<style scoped>

</style>
