<template>
  <q-card bordered class="card-post q-ma-md" flat>
    <div>
      <q-item>
        <q-item-section avatar class="titleUp">
          <q-avatar>
            <img src="../../assets/flashdev.png" alt="">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Sara Katz</q-item-label>
          <q-item-label caption>
            Tel-aviv, Israel
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-img src="https://cdn.quasar.dev/img/mountains.jpg"/>

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-caption text-grey">Jan 4 5:17PM</div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>

export default {
  name: "PostCard",

  data() {
    return {}
  },
}
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
