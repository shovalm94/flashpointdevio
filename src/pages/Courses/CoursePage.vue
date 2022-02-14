<template>
  <div>
    <div class="list" v-for="course in coursesList">
      <q-card class="rectangle">
        <q-item>
          <q-item-section avatar class="titleUp">
            <q-avatar>
            <img :src=course.logoCourse :alt="require('../../assets/flashdev.png')">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="firstHead">{{ course.courseName }}</q-item-label>
            <q-item-label caption class="secondHead">
              {{ course.TimeUpload }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item-section>
          <div>
            <img :src=course.ImgCourse class="courseImg" alt="courseImg">
          </div>
        </q-item-section>
        <q-card-section>
          <div class="lessonName"> שם השיעור</div>
          <div class="description"> {{ course.courseDescription }}</div>
        </q-card-section>
        <q-item>
          <q-item-section class="teacherImg" avatar>
            <q-avatar>
          <img :src=course.imgTeacher alt="teacherImg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="teacherName">{{ course.TeacherName }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

  </div>

</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";
import Lesson from "components/CourseComps/Lesson";

export default {
  name: "Courses",
  components: {Lesson},
  data() {
    return {}
  },
  computed: {
    ...mapState('courses', ['coursesList']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('courses', ['getCourses']),
    ...mapMutations('courses',['setCourses']),

    read() {
      this.getCourses();
    },

  },
  created() {
    this.read()
  }
}


</script>

<style scoped>

.list {
  height: 620px;
  width: 620px;
}

.rectangle {
  position: absolute;
  box-sizing: border-box;
  width: 620px;
  border: 1.77px solid #ECECEF;
  border-radius: 10.63px;
  background-color: #FFFFFF;
}

.firstHead {
  height: 41px;
  width: 234px;
  color: #212121;
  font-family: "Almoni DL AAA";
  font-size: 28.34px;
  letter-spacing: -0.33px;
  line-height: 40.74px;
  text-align: right;
}

.secondHead {
  height: 36px;
  width: 94px;
  color: #7A7A7A;
  font-family: "Almoni DL AAA";
  font-size: 23.03px;
  letter-spacing: -0.45px;
  line-height: 35.43px;
  text-align: right;
}

.courseImg {
  position: relative;
  height: 283.43px;
  width: 620px;
}

.lessonName {
  position: relative;
  height: 40.74px;
  width: 382.63px;
  color: #212121;
  font-family: "Almoni DL AAA";
  font-size: 28.34px;
  font-weight: bold;
  letter-spacing: -0.33px;
  line-height: 40.74px;
  text-align: right;
}

.description {
  height: 63.77px;
  width: 382.63px;
  color: #6C6B81;
  font-family: "Almoni DL AAA";
  font-size: 28.34px;
  letter-spacing: -0.33px;
  line-height: 31.89px;
  text-align: right;
}

.teacherName {
  height: 41px;
  width: 111px;
  opacity: 0.8;
  color: #212121;
  font-family: "Almoni DL AAA";
  font-size: 28.34px;
  letter-spacing: -0.33px;
  line-height: 40.74px;
  text-align: right;
}

.teacherImg {
  X: 1075.6px;
  Y: 672.69px;
  Width: 38.97px;
  Height: 38.97px;
}

</style>




