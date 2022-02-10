<template>
  <q-page>
    <courses/>
    <InfiniteLoading spinner="circles" @infinite="infiniteHandler">
      <span v-show="!getMore" class="noMore" slot="no-more">
        No more information
      </span>
    </InfiniteLoading>
  </q-page>
</template>

<script>
import Courses from "components/CourseComps/Courses";
import {mapState, mapActions, mapMutations} from "vuex";
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'FeedPage',
  components: {Courses, InfiniteLoading},
  data() {
    return {}
  },
  computed: {...mapState('courses', ['coursesList', 'getMore'])},
  methods: {
    ...mapActions('courses', ['getCourses']),
    ...mapMutations('courses', ['setCourses', 'setGetMore']),

    infiniteHandler($state) {
      this.getCourses().then(() => {
        if (this.getMore) {
          return $state.loaded()
        }
        return $state.complete()
      })
    }

  },
}
</script>

<style lang="scss">


</style>
