<template>
  <div class="flims">
    <div class="nowplaying-list">
      <!-- % 小bug 类型检查错误 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item['filmId']"
          @click="deailtTz(item['filmId'])"
        >
          <div class="nowing-img">
            <img :src="item['poster']" alt="" />
          </div>
          <div class="nowing-parer">
            <div class="uname-item">
              <span class="uname">{{ item["name"] }}</span>
              <span class="item">{{ item["item"]["name"] }}</span>
            </div>
            <div class="poorer">
              <span class="poorer-one audience"
                >主演：{{ author(item["actors"]) }}</span
              >
            </div>
            <div class="poorer">
              <span class="audience"
                >{{ "上映日期：" }} {{ time(item["premiereAt"], false) }}</span
              >
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import "../../uilt/flimslist.scss";
import { useMainStore } from "../../store";
import { https, lasyList, author } from "../../uilt/Filems-axim";
import { useRouter } from "vue-router";
import { time } from "../../uilt/Time";

//useRouter
const router = useRouter();
const mainStore = useMainStore();

//List lazy load switch
let loading = ref(false),
  finished = ref(false);

//Page parameter management
const data = reactive({
  total: 0,
  current: 1,
});

//all page datas
let list = ref([]);

// vuex state cityId
const cityId = Number(mainStore.cityId);

//Slide display
const onLoad = () => {
  lasyList(loading, finished, list, data, 2, cityId);
};
//onMounted
onMounted(() => {
  //Network request
  https(list, data, 2, cityId);
});

//Page Jump
const deailtTz = (id: number) => {
  router.push({
    name: "Dealt",
    params: {
      id,
    },
  });
};
</script>
