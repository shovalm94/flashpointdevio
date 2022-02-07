<template>
  <q-form @submit.prevent.stop="onSubmit()">
    <q-page class="flex flex-center">
      <div class="q-pa-md" style="width: 350px">
        <div>Update lesson:</div>

        <q-input ref="name" outlined v-model="updatedNewLesson.name"
                 :rules="[ val => val && val.length > 1 || 'Please type name']"
                 label="Name"
                 lazy-rules
                 type="text"/>

        <q-input ref="description" outlined v-model="updatedNewLesson.description"
                 :rules="[ val => val && val.length > 1 || 'Please type description']"
                 label="description"
                 lazy-rules
                 type="text"/>

        <q-file outlined v-model="updatedNewLesson.lessonVideo" label="upload video"
                hint="" id="fileUpload"></q-file>

        <q-btn color="primary" label="remove" @click="remove(updatedNewLesson.id)"/>
        <q-btn color="primary" label="back" @click="exit()"/>
        <q-btn class="text-primary" label="Update" outline type="submit"/>

      </div>

      <div class="q-pa-md row items-start q-gutter-md">
        <q-card v-ripple>
          <q-separator/>

        </q-card>
      </div>
    </q-page>
  </q-form>
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
        lessonVideo: [],
        id:''
      },
    }
  },

  methods: {
    ...mapActions('lessons', ['getSingleLesson', 'updateLesson', 'deleteLesson']),
    ...mapMutations('lessons', ['setNewLesson', 'setNewLessonId']),

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
      this.update()
    },

    setLocalNewLesson() {
      this.setNewLesson(this.updatedNewLesson);
    },

    update() {
      this.setLocalNewLesson();
      this.updateLesson();
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

    getItemById(id) {
      this.getSingleLesson(id);
    },

    remove(id) {
      this.setNewLessonId(id)
      this.deleteLesson(id);
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

    exit() {
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

  },

  created() {
    Object.assign(this.updatedNewLesson, this.newLesson)
    this.getItemById(this.newLesson.id);
  }

}


</script>

<style scoped>

</style>
