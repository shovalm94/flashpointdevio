<template>
  <q-page class="flex flex-center">

    <div class="q-pa-md" style="min-width: 450px">
      <h2>קורס ראשון: html, css</h2>

      <br><br><br>


      <h3>הוסף פרק חדש בקורס זה:</h3>
      <q-input outlined v-model="localNewChapter.Name" label="שם הפרק"/>
      <q-input outlined v-model="localNewChapter.LevelOfDifficulty" label="רמת קושי"/>
      <q-btn push color="primary" label="insert" @click="insert()"/>
      <q-btn color="primary" label="חזור לרשימת הקורסים" @click="exit()" style="width: 350px"/>
    </div>


    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-ripple v-for="chapter in chapters">
        <q-separator/>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ chapter.Name }}</div>
        </q-card-section>
        <q-separator/>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ chapter.LevelOfDifficulty }}</div>
        </q-card-section>
        <q-separator/>

        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ chapter.id }}</div>
        </q-card-section>
        <q-separator/>


<!--        <q-card-section class="bg-primary text-white">-->
<!--        <div class="q-pa-md">-->
<!--          <div class="q-gutter-md row items-start">-->
<!--&lt;!&ndash;            <div class="col-12">&ndash;&gt;-->
<!--&lt;!&ndash;              <q-badge color="secondary" multi-line>&ndash;&gt;-->
<!--&lt;!&ndash;                Model: "{{ model }}"&ndash;&gt;-->
<!--&lt;!&ndash;              </q-badge>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->

<!--&lt;!&ndash;            <q-select&ndash;&gt;-->
<!--&lt;!&ndash;              filled&ndash;&gt;-->
<!--&lt;!&ndash;              v-model="model"&ndash;&gt;-->
<!--&lt;!&ndash;              :options="options"&ndash;&gt;-->
<!--&lt;!&ndash;              option-value="id"&ndash;&gt;-->
<!--&lt;!&ndash;              option-label="desc"&ndash;&gt;-->
<!--&lt;!&ndash;              option-disable="inactive"&ndash;&gt;-->
<!--&lt;!&ndash;              emit-value&ndash;&gt;-->
<!--&lt;!&ndash;              map-options&ndash;&gt;-->
<!--&lt;!&ndash;              style="min-width: 250px; max-width: 300px"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--&lt;!&ndash;            <q-btn push color="primary" label="להוספת שיעור חדש" @click="LessonAdd()"/>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--        </q-card-section>-->
<!--<q-separator/>-->
        <q-card-section class="bg-primary text-white">
          <div class="q-pa-md">
            <q-btn-dropdown color="blue" label="lessons in this chapter">
              <q-list>
                <q-item clickable v-for="lesson in (chapter.Lessons)"  v-close-popup @click="LessonUpdate(lesson)">
                  <q-item-section>
                    <q-item-label >{{lesson.name}}</q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
            <q-btn push color="primary" label="להוספת שיעור חדש" @click="LessonAdd(chapter)"/>
          </div>
        </q-card-section>
        <q-separator/>

        <q-card-actions align="right">
        <q-btn flat @click="remove(chapter.id)">Delete</q-btn>
          <q-btn flat label="Update" @click="goToItem(editedCourseId, chapter)"></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>

</template>

<script>

import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  name: "Chapters",
  computed: {
    ...mapState('courses', ['courses','editCourse', 'editedCourseId']),
    ...mapState('chapters', ['chapters']),
    // ...mapState('lessons', [])
  },

  data() {
    return {
      localNewChapter: {
        Name: '',
        LevelOfDifficulty: '',
        Lessons: []
      },
      model: null,
      options: [
        {
          id: 'goog',
          desc: 'Google'
        },
        {
          id: 'fb',
          desc: 'Facebook'
        },
        {
          id: 'twt',
          desc: 'Twitter'
        },
        {
          id: 'app',
          desc: 'Apple'
        },
        {
          id: 'ora',
          desc: 'Oracle',
        }
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
      this.$router.push(`/UpdateChapters/${editedCourseId}/${chapter.id}`);
    },

    async LessonAdd (chapter) {
     await this.setNewChapter(chapter);
      await this.$router.push(`/Lessons`);
    },

    LessonUpdate (lesson) {
      debugger
      this.resetNewLesson();
      this.setNewLesson(lesson);
      this.$router.push(`/UpdateLesson/${lesson.id}`);
    },

    exit() {
      this.$router.push(`/createCourse`);
    },

  },

   async created() {
    await this.seeChapters();
    // this.setOptions();

  },

}
</script>

<style scoped>

</style>
