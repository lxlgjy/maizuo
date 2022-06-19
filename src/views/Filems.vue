<template>
  <flim-header></flim-header>
</template>

<script lang="ts" setup>
import FlimHeader from '../components/flims/flimHeader.vue'

</script>

<style lang="scss" scoped>
.swiperImg {
  img {
    width: 23.4375rem;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.nowplaying {
  .now-top {
    font-size: 0.1875rem;
    color: #191a1b;
    text-align: center;
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

body {
  font-family: Microsoft YaHei, Tahoma, Helvetica, Arial, sans-serif;
  font-size: 0.8125rem;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
