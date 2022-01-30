
<!-- THIS COMPONENT IS IN CHARGE OF STORAGE HANDLING -->
<!--  todo: this component is all about manging firebase storage. -->
<!--  image uploading (for any cause) should be managed from this component-->

<template>
  <div>

    <div>
      <div class="q-pa-md">
        <q-btn-dropdown round dense flat color="primary" dropdown-icon="camera_alt">
          <q-list>
            <q-item>
              <q-btn
                round
                dense
                flat
                v-close-popup
                color="primary"
                @click="click1">choose image
              </q-btn>
              <input type="file" ref="input1"
                     style="display: none"
                     @change="previewImage" accept="image/*">
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>

    <div class="q-pa-md q-gutter-sm" v-if="imageData!=null">
      <q-dialog v-model="card">
        <q-card class="my-card">
          <q-img :src="imageUrl"/>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              תמונת פרופיל
            </div>
            <div class="text-caption text-grey">
              זוהי תמונת הפרופיל שנבחרה. באפשרותך לבחור תמונה אחרת ע"י לחיצה על כפתור חזור
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-actions align="right">
            <q-btn v-close-popup flat color="primary" label="שמור"/>
            <q-btn v-close-popup flat color="primary" label="חזור"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imageData: null,
      imageUrl: null,
      card: false,
    }
  },
  methods: {
    click1() {
      this.$refs.input1.click()
    },
    previewImage(event) {
      const self = this
      self.uploadValue = 0;
      self.imageData = event.target.files[0];
      // this.upload()
    },
    // upload(){
    // }
  },
}
</script>
