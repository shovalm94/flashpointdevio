<template>
  <q-form @submit.prevent.stop="onSubmit()">
    <div class="q-pa-md" style="width: 350px">
      <div>insert new lesson:</div>
      <q-input ref="name" outlined v-model="LocalNewLesson.name"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="Name"
               lazy-rules
               type="text"/>

      <q-input ref="description" outlined v-model="LocalNewLesson.description"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="שDescription"
               lazy-rules
               type="text"/>

      <q-file outlined v-model="LocalNewLesson.lessonVideo" label="upload video"
              hint="סרטון השיעור" id="fileUpload"></q-file>

      <q-btn color="primary" label="Insert" @click="insert()"/>
      <q-btn class="text-primary" label="הוסף קורס" outline type="submit"/>

    </div>
  </q-form>
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
        TimeAgo: '',
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

    onSubmit() {
      this.$refs.description.validate()
      this.$refs.name.validate()
      debugger
      if (this.$refs.name.hasError || this.$refs.description.hasError) {
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

  }
}

</script>

<style scoped>

</style>


