<template>
  <div class="swiper" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
import { onMounted } from 'vue';

const props = defineProps({
  options: {
    type: String,
    default: null
  },
  loop: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: null,
    default: ''
  },
  slidesPerView: {
    type: Number || String,
    default: 1
  },
  freeMode: {
    type: Boolean,
    default: false
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: 'kenwin'
  }
})

onMounted(() => {
  new Swiper('.' + props.name, {
    loop: props.loop,
    autoplay: props.autoplay,
    slidesPerView: props.slidesPerView,
    freeMode: props.freeMode,
    spaceBetween: props.spaceBetween
  })
})

</script>

<style scoped>
.kenwin {
  height: 13.125rem;
}
</style>
