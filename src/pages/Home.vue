<template>
  <q-page class="q-pa-md main">
    <FeedPage />
  </q-page>
</template>

<script>
import FeedPage from "pages/Feed/FeedPage";

export default {
  name: 'home',
  components: {FeedPage},

}
</script>

<style lang="sass" scoped>
.main
  display: flex
  flex-direction: column
  align-items: center


</style>
