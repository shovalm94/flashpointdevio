<template>
  <div class="q-pa-md" style="width: 350px">
    <div>Updat chapters:</div>
    <q-input outlined v-model="updatedNewChapter.Name" label="Name"/>
    <q-input outlined v-model="updatedNewChapter.LevelOfDifficulty" label="LevelOfDifficulty"/>
    <q-btn color="primary" label="Update" @click="update()"/>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: 'updateChapters',

  components: {},

  computed: {
    ...mapState('courses', ['courses', 'editCourse', 'editedCourseId']),
    ...mapState('chapters', ['chapters', 'newChapter']),
  },

  data() {
    return {
      updatedNewChapter: {
        Name: '',
        LevelOfDifficulty: '',
      },
    }
  },

  methods: {
    ...mapActions('chapters', ['getSingleChapter', 'updateChapter']),
    ...mapMutations('chapters', ['setNewChapter']),

    setLocalNewChapter() {
      this.setNewChapter(this.updatedNewChapter);
    },

    update() {
      this.setLocalNewChapter();
      this.updateChapter();
      this.$router.push(`/Chapters/${this.editedCourseId}`);
    },

    getItemById() {
      this.getSingleChapter(this.newChapter.id);
    },

  },

  created() {
    Object.assign(this.updatedNewChapter, this.newChapter)
    this.getItemById(this.newChapter.id);
    }

}

</script>

<style scoped>

</style>



