<template>
  <div class="flims">
    <div class="nowplaying-list" v-if="list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        loading-text="加载中..."
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
              <span class="audience" style="margin-top: 1px">观众评分:</span>
              <span class="grade">{{ item["grade"] || "0" }}</span>
            </div>
            <div class="poorer">
              <span class="poorer-one audience"
                >主演：{{ author(item["actors"]) || "暂无主演" }}</span
              >
            </div>
            <div class="poorer">
              <span class="audience"
                >{{ item["nation"] }} | {{ item["runtime"] + "分钟" }}</span
              >
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import "../../uilt/flimslist.scss";
import { useRouter } from "vue-router";
import { https, lasyList, author } from "../../uilt/Filems-axim";
import { useMainStore } from "../../store";

// useRouter()
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
  lasyList(loading, finished, list, data, 1, cityId);
};
//Network request
https(list, data, 1, cityId);

//onMounted
onMounted(() => {
  let clientHeight2 = document.querySelector("footer")?.clientHeight;
  mainStore.getCinmesBtn(clientHeight2);
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
