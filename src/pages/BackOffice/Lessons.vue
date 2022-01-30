<template>
  <div class="q-pa-md" style="width: 350px">
    <div>insert new lesson:</div>
    <q-input outlined v-model="LocalNewLesson.name" label="Name"/>
    <q-input outlined v-model="LocalNewLesson.description" label="Description"/>
    <q-btn color="primary" label="Insert" @click="insert()"/>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "lessons",

  components: {},

  computed: {
    // ...mapState('courses', ['courses', 'editCourse']),
    // ...mapState('chapters', ['chapters', 'newChapter']),
    // ...mapState('lessons', ['']),
  },

  data() {
    return {
      LocalNewLesson: {
        name: '',
        description: '',
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
      this.$router.push(`/Chapters`)
    },

  }
}

</script>

<style scoped>

</style>


