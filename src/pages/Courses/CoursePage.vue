<template>
  <div>

    <div class="list" v-for="item in courses" :key="item.id">
      <q-card class="rectangle">
        <q-item>
        <q-item-section avatar class="titleUp">
          <q-avatar>
            <img src="../../assets/flashdev.png" alt="">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="firstHead">{{item.courseName}}</q-item-label>
          <q-item-label caption class="timeUp">
            {{item.TimeUpload}}
          </q-item-label>
        </q-item-section>
        </q-item>
        <q-item-section>
          <div class="courseImg">
            <q-img src="https://cdn.quasar.dev/img/mountains.jpg"/>
          </div>
          </q-item-section>
        <q-card-section>
          <div class="lessonName"> שם השיעור</div>
          <div class="discription"> {{item.courseDescription}}</div>
        </q-card-section>
        <q-item>
          <q-item-section class="teacherImg" avatar >
            <q-avatar>
              <img src="../../assets/flashdev.png" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="teacherName">{{item.TeacherName}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

  </div>

</template>

<script>

import firebaseInstance from '../../middleware/firebase'
import Lesson from "components/CourseComps/Lesson";

export default {
  name: "Cuorses",
  components: {Lesson},
  data() {
    return  {
      courses: []
    }
  },
  methods: {
    read() {
      firebaseInstance.db().collection('courses').get()
        .then(result => result.docs.forEach(doc => {
          debugger
          this.courses.push(doc.data())
        }))
    }
  },
  created() {
    this.read()
  }
}

</script>

<style scoped>
/*//.card-post{*/
/*//  .q-img*/
/*//    min-height: 200px*/
/*//    }*/
.list {
  X: 530px;
  Y: 120px;
  height: 620px;
  width: 620px;
}
.rectangle {
  position: absolute;
  X: 530px;
  Y: 120px;
  box-sizing: border-box;
  /*height: 620px;*/
  width: 620px;
  border: 1.77px solid #ECECEF;
  border-radius: 10.63px;
  background-color: #FFFFFF;
}
.firstHead{
  X: 794.94px;
  Y: 134.17px;
  height: 41px;
  width: 234px;
  color: #212121;
  font-family: "Almoni DL AAA";
  font-size: 28.34px;
  letter-spacing: -0.33px;
  line-height: 40.74px;
  text-align: right;
}

.timeUp {
  X: 934.66px;
  Y: 169.6px;
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
  X: 529.59px;
  Y: 206.94px;
  height: 283.43px;
  width: 620px;
}

.lessonName{
  position: relative;
  X: 728.4px;
  Y: 530.97px;
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
.discription{
  X: 728.4px;
  Y: 578.8px;
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
  X: 949.83px;
  Y: 670.91px;
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




