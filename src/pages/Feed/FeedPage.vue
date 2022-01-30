<template>
  <q-page>
    <!--    <div v-for="post in posts" class="q-mb-md">-->
    <PostCard class="q-pa-md"/>
    <!--    </div>-->
  </q-page>
</template>

<script>
import PostCard from '../../components/Feed/PostCard'


export default {
  name: 'post',
  components: {PostCard},
  data() {
    return {}
  }
}
</script>

<style lang="scss">


</style>
