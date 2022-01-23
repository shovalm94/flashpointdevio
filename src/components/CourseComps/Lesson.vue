<template>
  <div>
    <div class="video_wrapper">
      <iframe id="videoFrame" :src="lessonsUrl" title="vimeo-player"></iframe>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lesson',
  data() {
    return {
      lessonsUrl:'',
      lesson: {}
    }
  },

}
</script>

<style scoped>
.video_wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
}

#videoFrame:fullscreen {
  width: 100%;
  height: 100%;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>


