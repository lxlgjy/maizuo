<template>
  <div>
    <van-index-bar :index-list="computlist" @select="handerchange">
      <div v-for="item in data.NationalCitys" :key="item['letter']">
        <van-index-anchor :index="item['letter']" />
        <van-cell
          v-for="items in item['citys']"
          :key="items['cityId']"
          :title="items['name']"
          @click="handerclickCityName(items['name'], items['cityId'])"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, onUnmounted } from "vue";
import { http } from "../../uilt/http";
import { Filter } from "../../uilt/Filter";
import { useMainStore } from "../../store";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { computed } from "@vue/reactivity";

const mainStore = useMainStore();
const router = useRouter();

const data = reactive({
  NationalCitys: [],
});

//footer hide And show
mainStore.hide();
onUnmounted(() => {
  mainStore.show();
});

onMounted(() => {
  http({
    url: "/gateway?k=637186",
    method: "GET",
    headers: {
      "X-Host": "mall.film-ticket.city.list",
    },
  }).then(async (res) => {
    const cityslist: any = (await Filter(res.data.data.cities)) as any;
    data.NationalCitys = cityslist;
  });
});

const handerclickCityName = (name: string, id: string) => {
  mainStore.changeName(name);
  mainStore.changeId(id);
  router.back();
};

const handerchange = (index: string) => {
  Toast.setDefaultOptions({ duration: 500 });
  Toast(index);
};

const computlist = computed(() => {
  return data.NationalCitys.map((item) => item["letter"]);
});
</script>

<style>
.van-toast--html,
.van-toast--text {
  min-width: 30px;
}
</style>
