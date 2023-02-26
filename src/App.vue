<template>
  <div>
    <router-view> </router-view>

    <table-top></table-top>
  </div>
</template>
<script lang="ts" setup>
import TableTop from "./components/app/tableTop.vue";
</script>

<style>
body {
  background: rgba(77, 76, 76, 0.1);
}
</style>
