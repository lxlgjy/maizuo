<template>
  <div>
    <div id="headerTop">
      <van-nav-bar
        title="影院"
        left-arrow
        @click-left="clickleft"
        @click-right="clickright"
        :fixed="true"
      >
        <template #right>
          <van-icon name="search" size="25" color="black" />
        </template>
        <template #left>
          {{ mainStore.cityName }}
          <van-icon name="arrow-down" size="9" color="black" />
        </template>
      </van-nav-bar>
    </div>
    <city></city>
  </div>
</template>
<script lang="ts" setup>
import { onMounted , nextTick } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../store";
import city from "../views/cinmes/City.vue";

//useRouter
const router = useRouter();
const mainStore = useMainStore();

//onMounted
onMounted(() => {
  nextTick(() => {
    let clientHeight1 = document.querySelector("#headerTop")?.clientHeight;
    mainStore.getCinmesTop(clientHeight1);

    
  });
});

//left click style
const clickleft = () => {
  mainStore.clearcitylist();
  
  router.push({
    name: "NationalCities",
  });
};

const clickright = () => {
  router.push({
    name: "Search",
  });
};
</script>
<style lang="scss" scoped>
// #headerTop {
//   position: fixed;
//   top: 0;
//   left: 0;
// }
</style>