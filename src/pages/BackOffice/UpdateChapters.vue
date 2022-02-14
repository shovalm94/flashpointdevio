<template>
  <div class="q-pa-md" style="width: 350px">
    <div>Update chapters:</div>
    <q-input outlined v-model="updatedNewChapter.Name" label="Name"/>
    <q-input outlined v-model="updatedNewChapter.Description" label="תיאור הפרק"/>
    <q-input outlined v-model="updatedNewChapter.LevelOfDifficulty" label="רמת קושי"/>
    <q-file outlined v-model="updatedNewChapter.ChapterImg" label="upload image"
            hint="תמונת הפרק" id="fileUpload" ></q-file>
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
        Description:'',
        LevelOfDifficulty: '',
        ChapterImg:[],
        lessons: []
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
      this.$router.push(`/backOffice/chapters/${this.editedCourseId}`);
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



