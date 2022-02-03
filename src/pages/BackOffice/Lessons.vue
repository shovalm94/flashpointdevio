<template>
  <div class="q-pa-md" style="width: 350px">
    <div>insert new lesson:</div>
    <q-input outlined v-model="LocalNewLesson.name" label="Name"/>
    <q-input outlined v-model="LocalNewLesson.description" label="Description"/>
    <q-file outlined v-model="LocalNewLesson.lessonVideo" label="upload video"
            hint="סרטון השיעור" id="fileUpload"></q-file>
    <q-btn color="primary" label="Insert" @click="insert()"/>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "lessons",

  components: {},

  computed: {
    ...mapState('courses', ['courses', 'editCourse']),
    ...mapState('chapters', ['chapters', 'newChapter']),

  },

  data() {
    return {
      LocalNewLesson: {
        name: '',
        description: '',
        lessonVideo: []
      },
    }
  },

  methods: {
    ...mapActions('lessons', ['insertNewLesson']),
    ...mapMutations('lessons', ['setNewLesson']),

    setLocalNewLesson() {
      this.setNewLesson(this.LocalNewLesson);
    },

    async insert() {
      await this.setLocalNewLesson();
      await this.insertNewLesson();
      await this.$router.push(`/backOffice/chapters/${this.newChapter.id}`)
    },

  }
}

</script>

<style scoped>

</style>


