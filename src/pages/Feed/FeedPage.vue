<template>
  <q-page>




    <!--    <div v-for="post in posts" class="q-mb-md">-->
<!--    <PostCard class="q-pa-md"/>-->
    <CoursePage class="q-pa-md"/>
    <!--    </div>-->
  </q-page>
</template>

<script>
import PostCard from '../../components/Feed/PostCard'
import CoursePage from "pages/Courses/CoursePage";


export default {
  name: 'post',
  components: {CoursePage},
  data() {
    return {}
  }
}
</script>

<style lang="scss">



</style>
