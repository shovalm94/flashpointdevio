<template>
  <q-page>
    <!--    <div v-for="post in posts" class="q-mb-md">-->
<!--    <PostCard class="q-pa-md"/>-->
    <courses/>
    <InfiniteLoading spinner="circles"  @infinite="infiniteHandler">
      <span v-show="!coursesList" class="noMore" slot="no-more">
        No more information
      </span>
    </InfiniteLoading>
    <!--    </div>-->
  </q-page>
</template>

<script>
// import PostCard from '../../components/Feed/PostCard'
import Courses from "components/CourseComps/Courses";
import {mapState, mapActions, mapMutations} from "vuex";
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'post',
  components: {Courses, InfiniteLoading},
  data() {
    return {
      // localCourses:[],
      loading:false

    }
  },
  computed: {...mapState('courses', ['coursesList', 'lastBatch'])},
  methods: {
    ...mapActions('courses',['getCourses']),
    ...mapMutations('courses', ['setCourses', 'setLastBatch']),
    loadData() {
      return this.getCourses()
      .then(()=>{
        if(this.lastBatch === true){
          // this.localCourses = this.lastBatch
          // console.log(this.localCourses)
          return true
        }
        return false
      })
    },
    async infiniteHandler($state){
      // if (this.lastBatch.length > 0){
        const newCourses = await this.loadData()
        if (newCourses) {
          this.loading=true
          return $state.loaded()
        }
      // }
      this.loading=false
      // return $state.complete()
    }

  },
}
</script>

<style lang="scss">


</style>
