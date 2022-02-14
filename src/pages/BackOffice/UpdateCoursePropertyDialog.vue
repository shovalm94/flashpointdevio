<template xmlns:src="http://www.w3.org/1999/html">
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-md">
            <q-page-sticky position="top-left" :offset="[18, 18]">
              <div class="q-pa-md q-gutter-sm">
                <q-btn label="add new course" color="primary" @click="inception = true" style="min-width:350px"/>
                <q-dialog v-model="inception">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Add a new course</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                     <div>
                       <Creator></Creator>
                     </div>
                    </q-card-section>
                    <q-card-actions align="right" class="text-primary">
                      <q-btn style="color: #212121" flat label="Close" v-close-popup/>
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </q-page-sticky>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="(course) of courses" class="my-card">
      <q-card-section>
        <div id="CourseName"> שם הקורס: {{ course.courseName }}</div>
      </q-card-section>
      <img :src="course.imgCourseUrl" alt="photoCourse" class="courseImg">
      <q-card-section class="description">תיאור הקורס: {{ course.courseDescription }}</q-card-section>
      <br>
      <q-card-section class="teacherName">שם המרצה: {{ course.TeacherName }}
        <img :src="course.imgTeacherUrl" alt="photoTeacher" class="teacherImg"></q-card-section>
      <q-card-section class="timeAgo">הועלה לפני: {{ course.TimeAgo }}</q-card-section>
      <q-card-section class="studentNum">מספר סטודנטים בקורס: {{ course.NumberOfStudents }}</q-card-section>
      <q-card-section class="studentNum">קורס מספר: {{ 1 +course.index}}</q-card-section>
      <q-card-section>
        <q-btn class="cardButtons" @click="deleteCourse(course.id)">מחיקה</q-btn>
        <q-btn class="cardButtons" @click="showStudents(course)">סטודנטים</q-btn>
        <q-btn class="cardButtons" @click="updateCourse(course)">צפייה ועדכון</q-btn>
        <q-btn class="cardButtons" @click="goToCourseChapter(course)">פרקי הקורס</q-btn>
      </q-card-section>
    </q-card>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import Creator from "pages/BackOffice/Creator";

export default {
  name: "updateCoursePropertyDialog",
  components: {Creator},
  computed: mapState('courses', ['courses','ImgCourse']),
  data() {
    return {
      inception: false,
      framework: {
        plugins: [
          'Dialog'
        ]
      },
    }
  },
  methods: {

    ...mapMutations('courses', ['setEditedCourseId', 'setCourseStudent', 'resetEditCourse', 'updateCourse', 'setEditedCourse', 'setCourse']),
    ...mapActions('courses', ['getCourses', 'deleteCourseActions', "updateCourseActions", 'getCoursesBackOffice']),

    async deleteCourse(id) {
      await this.setEditedCourseId(id)
      await this.deleteCourseActions(id)
    },

    async updateCourse(course) {
      debugger
      this.setCourse(course)
      debugger
      this.setEditedCourseId(course.id)
      debugger
      await this.$router.push('/backOffice/singleCourse')
    },

    showStudents(Course) {
      this.setEditedCourse(Course);
      this.$router.push('/backOffice/students')
    },

    goToCourseChapter(course) {
      this.setEditedCourseId(course.id)
      this.setEditedCourse(course);
      this.$router.push(`/backOffice/chapters/${course.id}`);
    },
  },

  created() {
    this.getCoursesBackOffice();
  }
}

</script>

<style scoped>

#CourseName{
  height: 41px;
  width: 400px;
  color: #212121;
  font-family: "Almoni DL AAA bold";
  font-size: 28px;
  letter-spacing: -0.33px;
  line-height: 40px;
  text-align: right;
}

.my-card{
  box-sizing: border-box;
  min-height: 620px;
  min-width: 620px;
  border: 1px solid #ECECEF;
  border-radius: 10px;
  background-color: #FFFFFF;
}

.timeAgo, .studentNum{
  height: 36px;
  width: 400px;
  color: #7A7A7A;
  font-family: "Almoni DL AAA";
  font-size: 23px;
  letter-spacing: -0.45px;
  line-height: 35px;
  text-align: right;
}

.teacherName{
  height: 60px;
  width: 400px;
  color: #7A7A7A;
  font-family: "Almoni DL AAA";
  font-size: 23px;
  letter-spacing: -0.45px;
  line-height: 35px;
  text-align: right;
  display: inline;
}


.description {
  height: 42px;
  width: 382px;
  color: #6C6B81;
  font-family: "Almoni DL AAA";
  font-size: 28px;
  letter-spacing: -0.33px;
  line-height: 32px;
  text-align: right;
  display: inline;
}

.teacherImg{
  float:inside;
  height: 60px;
  width: 60px;
  display: inline;
}

.cardButtons{
  height: 32px;
  width: 140px;
  border-radius: 6px;
  background-color: #FFCA00;
}
.courseImg {
  height: 346.93px;
  width: 520px;
  margin-left: auto;
  margin-right: auto;
}

</style>
