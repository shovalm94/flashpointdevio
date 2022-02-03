<template>
  <q-page class="flex flex-center">

      <div class="q-pa-md" style="min-width: 450px">
        <!--      <h2>`קורס: {{ chapter.name }}`</h2>-->
        <q-btn color="primary" label="חזור לרשימת הפרקים" @click="exit()" style="width: 350px"/>
      </div>


    <div class="q-pa-md" style="width: 350px">
      <div>Update lesson:</div>
      <q-input outlined v-model="updatedNewLesson.name" label="Name"/>
      <q-input outlined v-model="updatedNewLesson.description" label="Description"/>
      <q-btn color="primary" label="Update" @click="update()"/>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-ripple>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">שם השיעור: {{ newLesson.name }}</div>
        </q-card-section>


        <q-card-section class="bg-primary text-white">
          <div class="text-h6">תיאור תוכן השיעור: {{ newLesson.description }}</div>
        </q-card-section>


        <q-card-section class="bg-primary text-white">
          <img :src="newLesson.lessonVideo" alt="Lesson video">
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat @click="remove(newLesson.id)">Delete</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>

</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: 'testUpdateComponent',

  components: {},

  computed: {
    ...mapState('lessons', ['newLesson']),
    ...mapState('chapters', ['newChapter']),
  },

  data() {
    return {
      updatedNewLesson: {
        name: '',
        description: '',
        lessonVideo: []
      },
    }
  },

  methods: {
    ...mapActions('lessons', ['getSingleLesson', 'updateLesson', 'deleteLesson']),
    ...mapMutations('lessons', ['setNewLesson']),

    setLocalNewLesson() {
      this.setNewLesson(this.updatedNewLesson);
    },

    update() {
      this.setLocalNewLesson();
      this.updateLesson();
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

    getItemById(id) {
      debugger
      this.getSingleLesson(id);
    },

    remove(id) {
      this.deleteLesson(id);
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

    exit() {
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

  },

  created() {
    Object.assign(this.updatedNewLesson, this.newLesson)
    debugger
    this.getItemById(this.newLesson.id);
  }

}


</script>

<style scoped>

</style>
