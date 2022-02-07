<template>
  <q-form @submit.prevent.stop="onSubmit()">
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="min-width: 450px">
     <h2>{{ test() }}</h2>

      <br><br><br>

      <h3>הוסף פרק חדש בקורס זה:</h3>
      <q-input ref="name" outlined v-model="localNewChapter.Name"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="שם הפרק"
               lazy-rules
               type="text"/>

      <q-input ref="description" outlined v-model="localNewChapter.Description"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="תיאור הפרק"
               lazy-rules
               type="text"/>

      <q-input ref="level" outlined v-model="localNewChapter.LevelOfDifficulty"
               :rules="[ val => val && val.length > 1 || 'Please type something']"
               label="רמת קושי"
               lazy-rules
               type="text"/>

      <q-file outlined v-model="localNewChapter.ChapterImg" label="upload image"
              hint="תמונת הפרק" id="fileUpload"></q-file>
      <q-select outlined v-model="model" :options="options" label="מספר הפרק (בברירת מחדל יכנס כפרק האחרון)" />
      <q-btn push color="primary" label="insert" @click="insert()"/>
      <q-btn class="text-primary" label="הוסף קורס" outline type="submit" />
      <q-btn color="primary" label="חזור לרשימת הקורסים" @click="exit()"
             style="width: 350px"/>
    </div>


    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-ripple v-for="chapter in chapters">

        <q-card-section class="bg-primary text-white">
          <img :src="chapter.ChapterImg" alt="תמונה">
        </q-card-section>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">פרק מספר: {{1+chapter.index}} </div>
        </q-card-section>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">שם הפרק: {{ chapter.Name}} </div>
        </q-card-section>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">תיאור תוכן הפרק: {{ chapter.Description}}</div>
        </q-card-section>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">רמת קושי/רמת השתדלות נדרשת:  {{ chapter.LevelOfDifficulty }}</div>
        </q-card-section>


        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ chapter.id }}</div>
        </q-card-section>

        <q-card-section class="bg-primary text-white">
          <div class="q-pa-md">
            <q-btn-dropdown color="blue" label="lessons in this chapter">
              <q-list>
                <q-item clickable v-for="lesson in (chapter.Lessons)"  v-close-popup @click="LessonUpdate(chapter,lesson)">
                  <q-item-section>
                    <q-item-label >{{lesson.name}}</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
            <q-btn push color="primary" label="להוספת שיעור חדש" @click="LessonAdd(chapter)"/>
          </div>
        </q-card-section>

        <q-card-actions align="right">
        <q-btn flat @click="remove(chapter.id)">Delete</q-btn>
          <q-btn flat label="Update" @click="goToItem(editedCourseId, chapter)"></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
  </q-form>
</template>

<script>

import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  name: "Chapters",
  computed: {
    ...mapState('courses', ['courses', 'editCourse', 'editedCourseId']),
    ...mapState('chapters', ['chapters', 'lastChapterIndex']),

  },

  data() {
    return {

      localNewChapter: {
        Name: '',
        Description: '',
        LevelOfDifficulty: '',
        ChapterImg: [],
        TimeUpload: new Date().toString(),
        Lessons: [],
        index:'',
      },

      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],

    }
  },

  methods: {
    ...mapActions('chapters', ['insertNewChapter', 'getChapters', 'getLessons', 'deleteChapter']),
    ...mapMutations('chapters', ['setNewChapter']),
    ...mapMutations('lessons', ['resetNewLesson','setNewLesson']),

    async seeChapters() {
      await this.getChapters();
      await this.getLessons();
    },

    onSubmit() {
      this.$refs.description.validate()
      this.$refs.level.validate()
      this.$refs.name.validate()
      debugger
      if (this.$refs.name.hasError || this.$refs.level.hasError || this.$refs.description.hasError) {
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

    setLocalNewChapter() {
      this.setNewChapter(this.localNewChapter);
    },

    async insert() {
      await this.setLocalNewChapter();
      await this.insertNewChapter();
    },

    remove(id){
      this.deleteChapter(id);
    },

    goToItem(editedCourseId, chapter) {
      this.setNewChapter(chapter)
      this.$router.push(`/backOffice/updateChapters/${editedCourseId}/${chapter.id}`);
    },

    async LessonAdd (chapter) {
     await this.setNewChapter(chapter);
      await this.$router.push(`/backOffice/lessons`);
    },

    LessonUpdate (chapter, lesson) {

      this.setNewChapter(chapter);
      this.resetNewLesson();
      this.setNewLesson(lesson);
      this.$router.push(`/backOffice/updateLesson/${lesson.id}`);
    },

    exit() {
      this.$router.push(`/backOffice/UpdateCoursePropertyDialog`);
    },

    test : function() {
      return  ' שם הקורס:' + this.editCourse.courseName
    },

  },

   async created() {
    await this.seeChapters();

  },

}
</script>

<style scoped>

</style>
