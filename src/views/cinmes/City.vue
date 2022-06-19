<template>
  <div class="city">
    <div class="box">
      <city-list :citylist="mainStore.citylist"></city-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUpdated, reactive } from "vue";
import { useMainStore } from "../../store";
import CityList from "../../components/cinmes/citylist.vue";
// import BScroll from '@better-scroll/core'

const data = reactive({
  height: "",
});

//useStore
const mainStore = useMainStore();

//  computed page clientHeight
data.height =
  document.documentElement.clientHeight -
  mainStore.cinmesfooter -
  mainStore.cinmestopNum +
  "px";

//request ajax in vuex
// mainStore.getcitylist()

onMounted(() => {
  
  if ((mainStore.citylist.length == 0)) {
    mainStore.getcitylist();
  }
});

</script>
<style lang="scss" scoped>
.city {
  background: #fff;
  box-sizing: border-box;
  z-index: 20;

  .box {
    // overflow: hidden;
    overflow-y: scroll;
    height: auto;
    position: relative;
    margin-bottom: 49px;
    margin-top: 46px;
  }
}
</style>
