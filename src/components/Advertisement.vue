<template>
  <div v-if="finalImageUrl" class="advertisement">
    <img :src="finalImageUrl" alt="Advertisement" />
  </div>
</template>

<script>
import defaultAdImage from '../assets/images/basead.png'; // Adjust the path as needed

export default {
  name: 'Advertisement',
  props: {
    imageUrl: {
      type: String,
      default: defaultAdImage
    }
  },
  computed: {
    finalImageUrl() {
      return this.imageUrl || defaultAdImage;
    }
  }
};
</script>

<style scoped>
.advertisement img {
  max-width: 100%;
  height: auto;
}
</style>
