<template>
  <div class="q-pa-md" style="width: 350px">
    <div>Update chapters:</div>
    <q-input outlined v-model="updatedNewChapter.Name" label="Name"/>
    <q-input outlined v-model="updatedNewChapter.Description" label="תיאור הפרק"/>
    <q-input outlined v-model="updatedNewChapter.LevelOfDifficulty" label="רמת קושי"/>
    <q-file outlined v-model="updatedNewChapter.ChapterImg" label="upload image"
            hint="תמונת הפרק" id="fileUpload" ></q-file>
    <q-btn class="btn" color="primary" label="Update" @click="update()"/>
    <q-btn class="btn" color="primary" label="back" @click="exit()"/>
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

    exit() {
      this.$router.push(`/backOffice/chapters/${this.newChapter.id}`);
    },

  },

  created() {
    Object.assign(this.updatedNewChapter, this.newChapter)
    this.getItemById(this.newChapter.id);
    }

}

</script>

<style scoped>
.btn{
  margin-left: 12px;
  margin-right: 12px;
}
</style>



