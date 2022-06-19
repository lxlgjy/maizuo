<template>
  <van-nav-bar
    :title="mainStore.detaliName"
    @click-left="clickleftmethods"
    @click-right="clickrightmethods"
  >
    <template #left>
      <van-icon name="arrow-left" size="22" color="black" />
    </template>
    <template #right>
      <van-icon name="search" size="22" color="black" />
    </template>
  </van-nav-bar>
  <van-tabs
    v-model:active="active"
    @click-tab="getCinmesData(active)"
    @rendered="firstGetData(active)"
    :lazy-render="true"
    class="shopAll"
  >
    <van-tab
      v-for="index in mainStore.detailShoppingList"
      :title="shopTime(index['showDate'])"
    >
      <li v-for="item in mainStore.shopGetDateList">
        <a href="javascript:">
          <div class="address">
            <span>{{ item["name"] }}</span>
            <span>{{ item["address"] }}</span>
          </div>
          <div class="price">
            <span>{{ "￥" }}{{ item["lowPrice"] / 100 }}{{ "起" }}</span>
            <span>{{ "距离未知" }}</span>
          </div>
        </a>
      </li>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { onMounted, ref , onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getAsyncFlimesId, getALLCinmes } from "../uilt/Filems-axim";
import { useMainStore } from "../store";
import { shopListTime } from "../uilt/Time";

const active = ref(0);

const shopTime = (shoplistTime: number) => {
  return shopListTime(shoplistTime);
};

const router = useRouter();
const mainStore = useMainStore();

// footer hide And show
mainStore.hide()
onUnmounted(() => {
  mainStore.show()
})

onMounted(async () => {
  let detailId = Number(mainStore.detaliId);
  let cityId = Number(mainStore.cityId);

  const shoplist = await getAsyncFlimesId(detailId, cityId);
  mainStore.changeShoplist(shoplist);
});

//Obtain ticket purchase information and address amount
const getCinmesData = async (idnex: number) => {
  let cityId = mainStore.cityId;
  let cinemaIds = mainStore.detailShoppingList[idnex]["cinemaList"] as any;

  const shopList = await getALLCinmes(cityId, cinemaIds.toString());
  mainStore.getshopList(shopList);
};

//First load trigger
const firstGetData = async (index: number) => {
  if (index == 0) {
    let cityId = mainStore.cityId;
    let cinemaIds = mainStore.detailShoppingList[0]["cinemaList"] as any;

    const shopList = await getALLCinmes(cityId, cinemaIds.toString());
    mainStore.getshopList(shopList);
  }
};

const clickleftmethods = () => {
  router.back();
};
const clickrightmethods = () => {
  router.push({
    name: "Search",
  });
};
</script>

<style lang="scss" scoped>
.shopAll {
  background-color: #fff !important;
}
li {
    padding: 15px;
    border-bottom: 1px solid #ededed;
    position: relative;
    display: list-item;
    text-align: -webkit-match-parent;

    a {
      display: flex;

      .address {
        float: left;
        padding-right: 15px;
        text-align: left;
        flex: 4;

        span {
          display: block;
          font-size: 15px;
        }

        span:nth-child(2) {
          max-width: 212px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #797d82;
        }
      }

      .price {
        float: right;
        right: 0;
        width: 70px;
        text-align: center;
        flex: 1;
        margin-right: 8px;

        span:nth-child(1) {
          color: #ff5f16;
          font-size: 15px;
        }

        span:nth-child(2) {
          margin-top: 5px;
        }

        span {
          display: block;
          float: right;
          font-size: 12px;
          color: #797d82;
        }
      }
    }

  }

  li:last-child {
    border: none;
  }
</style>
