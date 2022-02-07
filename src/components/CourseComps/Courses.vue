<template>



  <div>
<!--    <q-infinite-scroll @load="onLoad(5, resume=>void 1)" :offset="500"/>-->
    {{coursesList}}
    <div class="list" v-for="(course, index) in coursesList" :key="index">
      <q-card class="rectangle">
        <q-item>
          <q-item-section avatar class="titleUp">
            <q-avatar>
              <img :src= course.logoCourse alt="courseLogo">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="firstHead">{{course.courseName}}</q-item-label>
            <q-item-label caption class="secondHead">
              {{course.TimeUpload}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item-section>
          <div >
            <img :src= course.ImgCourse class="courseImg" alt="courseImg">
          </div>
        </q-item-section>
        <q-card-section>
          <div class="lessonName"> שם השיעור</div>
          <div class="discription"> {{course.courseDescription}}</div>
        </q-card-section>
        <q-item>
          <q-item-section class="teacherImg" avatar>
            <q-avatar>
              <img :src= course.imgTeacher alt="teacherImg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="teacherName">{{course.TeacherName}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: "Courses",
  data() {
    return{


    }
  },
  computed: {...mapState('courses', ['coursesList', 'lastBatch'])},
  methods: {
    ...mapActions('courses', ['getCourses', 'updateList']),
    ...mapMutations('courses', ['setCourses', 'setLastBatch', 'setNextBatch']),
    // onLoad(index, done) {
    //   debugger
    //   setTimeout(() => {
    //     // if (this.items.length > 5) {
    //
    //     this.updateList()
    //     done()
    //     // }
    //   }, 2000)
    // }

  },
  created() {
    this.getCourses()
  }
}
</script>

<style scoped>

</style>
