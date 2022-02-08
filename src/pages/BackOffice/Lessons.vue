<template>
  <q-form @submit.prevent.stop="onSubmit()">
    <div class="q-pa-md" style="width: 350px">
      <div>insert new lesson:</div>
      <q-input ref="name" outlined v-model="LocalNewLesson.name"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="Name"
               lazy-rules
               type="text"/>

      <q-select outlined v-model="LocalNewLesson.index" :options="indexForScroll()"
                label="מספר השיעור (בברירת מחדל יכנס כשיעור האחרון)"/>

      <q-input ref="description" outlined v-model="LocalNewLesson.description"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="שDescription"
               lazy-rules
               type="text"/>

      <q-file outlined v-model="LocalNewLesson.lessonVideo" label="upload video"
              hint="סרטון השיעור" id="fileUpload"></q-file>

      <q-btn color="primary" label="Insert" @click="insert()"/>
      <q-btn class="text-primary" label="הוסף קורס" outline type="submit"/>
      <br>
      <br>

      <q-btn color="primary" label="חזור לרשימת הפרקים" @click="exit()" style="width: 350px"/>
    </div>
  </q-form>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "lessons",

  computed: {
    ...mapState('courses', ['courses', 'editCourse']),
    ...mapState('chapters', ['chapters', 'newChapter']),
    ...mapState('lessons', ['lessons']),
  },

  data() {
    return {
      LocalNewLesson: {
        name: '',
        description: '',
        TimeAgo: '',
        index: '',
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

    exit() {
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

    indexForScroll() {
      let arr = []
      for (const lesson of this.lessons) {
        arr.push(lesson.index)
      }
      return arr
    },

  }
}

</script>

<style scoped>

</style>


