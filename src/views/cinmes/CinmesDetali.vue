<template>
  <div id="cinmesAll">
    <van-nav-bar
      @click-left="onClickLeft"
      :fixed="true"
      :placeholder="true"
      :z-index="100"
      :title="title"
      class="top"
    >
      <template #left>
        <van-icon name="arrow-left" size="19" color="black" />
      </template>
    </van-nav-bar>
    <div class="title">
      <p>{{ data.titleName }}</p>
    </div>
    <div class="label" @click="JumpLabelDetails" v-show="data.services">
      <li v-for="item in data.services">{{ item.name }}</li>
      <p></p>
    </div>
    <van-popup
      v-model:show="topShow"
      position="top"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        @click-left="onClickLeftShow"
        :fixed="true"
        :placeholder="true"
        :z-index="100"
        :title="title"
        class="top"
      >
        <template #left>
          <van-icon name="cross" size="19" color="black" />
        </template>
      </van-nav-bar>
      <div class="title">
        <p>{{ data.titleName }}</p>
      </div>
      <div class="topHide">
        <div v-for="item in data.services" class="topHideli">
          <div class="topHideLable">{{ item.name }}</div>
          <div class="topHideRight">{{ item.description }}</div>
        </div>
      </div>
    </van-popup>
    <van-nav-bar :title="data.address" class="van-nav-bar">
      <template #left>
        <van-icon name="link-o" color="black" size="20" />
      </template>
      <template #right>
        <van-icon name="phone-o" color="black" size="20" />
      </template>
    </van-nav-bar>
    <div class="datapages" v-if="data.cinmesList.length">
      <!-- Image background blur -->
      <div class="flimes-swiper-o">
        <div class="imgbgc"></div>
      </div>
      <!-- Picture rotation -->
      <div class="flimes-swiper">
        <div class="swiper-container swiperlist" style="height: 130px">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in data.cinmesList"
              :key="item['filmId']"
              style="width: 90px"
            >
              <img :src="item['poster']" alt="" width="72" height="104" />
            </div>
          </div>
        </div>
        <div class="flimes-swiper-toggle">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAH1JREFUSA3N0EsKgDAMBNB4cu3JYyJ1oRTtZ/IZGLIbHiEChpkPLXASN1Vxcq7kQgpJP/dODqSoWrgbG4v8wcUiO3ExyEGcL3IS54NcxNkiQTgbJBiHRRrhMEhj3BrSCTeHdMaNIYNwfchg3DcyCa6NTIZ7IDfFEdEuzZhyAkTR3AC3/R6VAAAAAElFTkSuQmCC"
            alt=""
          />
        </div>
      </div>
      <!-- Film details display -->
      <div class="flimes-title" @click="handerDetali">
        <div class="flmes-one">
          <span style="padding-right: 5px; font-size: 15px">{{
            data.flimesName
          }}</span>
          <span style="color: #ffb232"> {{ data.flimesGrade }}</span>
          <span style="color: #ffb232">分</span>
        </div>
        <div class="flimes-secoed">
          {{ data.flimesCategory }}|{{ data.flimesRuntime + "分钟" }}|{{
            data.flimesDirector
          }}|{{ data.flimesActors }}
        </div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAAAXNSR0IArs4c6QAAAhJJREFUOBGFU79PFEEUnh932Liz1xDAMezRaWFBrlEaw8XORBNjSAw0hIbWzmBri38BIdIZFRIKEyCBmGhMLC38EQu9u9wASkNuz0S4g+F7w+zGhT19xc778X1vZr55K7XWDwMVLgehCuNW6w37j0mAX1lrNbPsZqhK3Thuvf0XR15UgQbgBoEss+MqKH0F6VMvkrg0OPiIc7bpAZxx+0zryDXII3FKlsvl0sFh5z3cqx60VyzI641G47uP00WQV6vV9vuKhdtwf/lKf7d79Joa+ThdHIGier3+Q3B2l3P+h2LL2JXDTnelUqkUKU5MJg6tcRw3lQq+AXwfIR13pP27fRn5VaqTZQiUQPGzCsMDbHGLYthooFSnHcdO7nMEQuAB34E0DNIoxbBqIrdT6TSX/dLZd3Z/ruFRq1Shu3Emqz0JBDorN0gfU5UIkGfomGnak0BHgqzLJC81Oj2Snc29tAMIsWAtu+d3tXijSWPMRu4OQ1rPATztwYwLPgfwS9coSSar1sMTx/boOWJ3doAXt5vNmaSe2YGm1LLjpRTM+dbQwMBsAqY1VSCKohFc8gNy/R7w5UJfcYwG08ducZcmvQHeQibyxT1M7zgGcvdvMPkikQ+++xdIPihyh6b3LJhiKURhHs//wBchn5wyprmeB6acwH88kRY5e2xM40Ua5zgS82/xjNcg39MdY57kYDKpEyF1uKDTCa4lAAAAAElFTkSuQmCC"
          alt=""
          width="4"
          height="8"
        />
      </div>
      <!-- Movie playback time, purchase time-->
      <van-tabs
        v-model:active="active"
        @rendered="firstLoading(active)"
        :lazy-render="true"
        @click-tab="ClickJump(active)"
        :swipeable="true"
        :ellipsis="false"
      >
        <van-tab
          v-for="index in data.showDate"
          :title="shopListTime(index)"
          style="overflow-y: scroll; height: auto"
        >
          <li
            v-for="item in data.showTimeData"
            class="showTime-All"
            v-if="data.showTimeData.length"
          >
            <div class="left">
              <div class="start-on">
                {{ shopListTime(item["showAt"], true) }}
              </div>
              <div class="start-end">
                {{ shopListTime(item["endAt"], true) + "散场" }}
              </div>
            </div>
            <div class="module">
              <div class="module-on">
                {{ item["filmLanguage"] }}{{ item["imagery"] }}
              </div>
              <div class="module-end">{{ item["hallName"] }}</div>
            </div>
            <div class="right">
              <div class="right-on">购票</div>
              <div class="right-end">￥{{ item["maxSalePrice"] / 100 }}</div>
            </div>
          </li>
          <div v-else class="hideCinmes">
            <img
              src="https://assets.maizuo.com/h5/v5/public/app/img/emptyFilmList.4e4721ad.png"
              alt=""
            />
            <div>暂无场次</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-else class="hideCinmes">
      <img
        src="https://assets.maizuo.com/h5/v5/public/app/img/emptyFilmList.4e4721ad.png"
        alt=""
      />
      <div>暂无场次</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, nextTick, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../../store";
import { getCinmesDetaliList, shwoTimelist } from "../../uilt/Filems-axim";
import Swiper from "swiper";
import { shopListTime } from "../../uilt/Time";
// import Swiper styles
import "swiper/css";

let active = ref(0);

let title = ref("");

let topShow = ref(false);

const data = reactive({
  titleName: "",
  address: "",
  services: [] as any,
  cinmesList: [],
  flimesName: "",
  flimesGrade: "",
  flimesCategory: "",
  flimesRuntime: "",
  flimesActors: [],
  flimesDirector: "",
  showDate: [],
  flimesId: "",
  showTimeData: [],
});

const router = useRouter();
const mainStore = useMainStore();

onMounted(async () => {
  let cinmesId = mainStore.cinmesDetaliList as any;

  let CinemaInformation = "mall.film-ticket.cinema.info";
  let Movieinformation = "mall.film-ticket.film.cinema-show-film";

  const Cinmes = (await getCinmesDetaliList(
    cinmesId,
    CinemaInformation
  )) as any;

  // Theater information rendering
  data.titleName = Cinmes.cinema.name;
  data.address = Cinmes.cinema.address;
  data.services = Cinmes.cinema.services;
  const CinmesMove = (await getCinmesDetaliList(
    cinmesId,
    Movieinformation
  )) as any;
  //Movie information rendering
  data.cinmesList = CinmesMove["films"] as any;

  mainStore.hide();

  //swiper
  nextTick(async () => {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 15,
      centeredSlides: true,
      loop: false,
      on: {
        slideChangeTransitionStart: function () {
          setSwiperBackground(this);
        },
        init: function () {
          // After initialization, no transition end is added, no bugs are found in the operation, and no deep thinking is given to the problems caused by this

          setSwiperBackground(this);
        },
      },
    });
    getScorll();
  });
});

onUnmounted(() => {
  mainStore.show();
  window.onscroll = null;
});

//Add style attribute to DOM element
const setSwiperBackground = (index: any) => {
  let imgbgc = document.querySelector(".imgbgc") as HTMLDivElement;
  imgbgc.style.backgroundImage = `url(${
    data.cinmesList[index.activeIndex]["poster"]
  })`;
  data.flimesName = data.cinmesList[index.activeIndex]["name"];
  data.flimesGrade = data.cinmesList[index.activeIndex]["grade"];
  data.flimesCategory = data.cinmesList[index.activeIndex]["category"];
  data.flimesRuntime = data.cinmesList[index.activeIndex]["runtime"];
  data.flimesDirector = data.cinmesList[index.activeIndex]["director"];
  data.showDate = data.cinmesList[index.activeIndex]["showDate"];
  data.flimesId = data.cinmesList[index.activeIndex]["filmId"];
  //Call function assignment and processing
  getActores(data.cinmesList[index.activeIndex]["actors"]);
};

const getActores = (list: any) => {
  let arr = [];
  for (let i = 0; i < list.length; i++) {
    arr.push(list[i].name);
  }

  data.flimesActors = arr.toString().replace(",", " ") as any;
};

const onClickLeft = () => {
  router.back();
};

const onClickLeftShow = () => {
  topShow.value = false;
};
//Current city ID number
const cinmesID = mainStore.cinmesDetaliList as unknown as string;

const firstLoading = async (index: number) => {
  if (index == 0) {
    let flimesId = data.flimesId;
    let dataParmes = data.showDate[0];
    const shwoTimeData = (await shwoTimelist(
      flimesId,
      cinmesID,
      dataParmes
    )) as never;
    data.showTimeData = shwoTimeData;
  }
};

const ClickJump = async (index: number) => {
  let dataParems = data.showDate[index];
  let flimesId = data.flimesId;
  const shwoTimeData = (await shwoTimelist(
    flimesId,
    cinmesID,
    dataParems
  )) as never;
  data.showTimeData = shwoTimeData;
};

const handerDetali = () => {
  router.push({
    name: "Dealt",
    params: {
      id: mainStore.detaliId,
    },
  });
};

const JumpLabelDetails = () => {
  topShow.value = true;
};

//File extraction page cannot be returned
const getScorll = () => {
  let titles = document.querySelector(".title") as HTMLDivElement;
  let top = document.querySelector(".top") as HTMLDivElement;
  let flimesTitle = document.querySelector(".flimes-title") as HTMLDivElement;
  let slide = document.querySelector(".van-tabs__wrap") as HTMLDivElement;
  window.onscroll = () => {
    const scorll =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scorll >= 12) {
      titles.style.display = "none";
      title.value = data.titleName;
    }
    if (scorll < 12) {
      titles.style.display = "block";
      title.value = "";
    }

    if (scorll > 251) {
      flimesTitle.style.position = "sticky";
      flimesTitle.style.zIndex = "101";
      flimesTitle.style.top = top.clientHeight + "px";
      flimesTitle.style.backgroundColor = "#fff";

      slide.style.position = "sticky";
      slide.style.zIndex = "101";
      slide.style.top = top.clientHeight + flimesTitle.clientHeight + "px";
      slide.style.backgroundColor = "#fff";
    }
  };
};
</script>
<style lang="scss" scoped>
.hideCinmes {
  height: 180px;
  padding: 40px 0 44px;
  text-align: center;
  img {
    width: 70px;
    height: 70px;
  }
  div {
    color: #bdc0c5;
    font-size: 14px;
  }
}
div {
  box-sizing: border-box;
}
#cinmesAll {
  background-color: #fff;
}
.van-nav-bar {
  :deep(.van-nav-bar__title) {
    font-size: var(--van-font-size-sm) !important;
  }
}
.datapages {
  position: relative;
  box-sizing: border-box;
  .imgbgc {
    height: 100%;
    width: 100%;
    filter: blur(30px);
    -webkit-filter: blur(30px);
  }
  .flimes-swiper-toggle {
    position: relative;
    display: flex;
    height: 10px;
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    top: 5px;
    img {
      width: 20px;
      height: 10px;
      aspect-ratio: auto 20 / 10;
    }
  }
  .flimes-title {
    height: 80px;
    padding: 15px 0;
    box-sizing: border-box;
    position: relative;
    .flmes-one {
      text-align: center;
      margin-bottom: 10px;
    }
    .flimes-secoed {
      color: #797d82;
      height: 18px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 12%;
    }
    img {
      position: absolute;
      right: 15px;
      margin-top: 36px;
      top: 0;
    }
  }
  .showTime-All {
    height: 74px;
    position: relative;
    padding: 15px 15px;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #ededed;
      color: #ededed;
      transform: scaleY(0.5);
    }
    .left {
      float: left;
      width: 84px;
      .start-on {
        color: #191a1b;
        font-size: 15px;
      }
      .start-end {
        color: #797d82;
        font-size: 13px;
        margin-top: 2px;
      }
    }
    .module {
      float: left;
      width: calc(100% - 210px);
      .module-on {
        color: #191a1b;
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .module-end {
        color: #797d82;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .right {
      float: right;
      color: #ff5f16;
      padding: 10px 0;
      line-height: 25px;
      .right-on {
        float: right;
        height: 25px;
        border-radius: 2px;
        width: 50px;
        position: relative;
        text-align: center;
        &::after {
          content: "";
          border: 1px solid #ff5f16;
          position: absolute;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-radius: 4px;
          transform: scale(0.5);
        }
      }

      .right-end {
        float: right;
        padding-right: 20px;
        font-size: 15px;
      }
    }
  }
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1.3) !important;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(1);
}

.flimes-swiper {
  position: relative;
  height: 160px;
  padding: 15px 0;
  box-sizing: border-box;
  .swiperlist {
    // justify-content: center;
    overflow: hidden;
    margin-right: auto;
    margin-left: auto;
  }
}
.flimes-swiper-o {
  position: absolute;
  top: 0;
  height: 160px;
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
  box-sizing: border-box;
}

.title {
  height: 44px;
  padding: 0 15px;
  line-height: 44px;
  p {
    font-size: 17px;
    text-align: center;
  }
}

.label {
  padding: 5px 0 15px;
  height: 38px;
  box-sizing: border-box;
  display: flex;
  color: #ffb232;
  text-align: center;
  overflow: hidden;
  position: relative;
  padding: 5px 0 15px;
  box-sizing: border-box;
  justify-content: center;
  li {
    position: relative;
    padding: 0 6px;
    margin: 0 2.5px;
    font-size: 10px;
    &::after {
      content: "";
      transform: scale(0.5);
      position: absolute;
      border: 1px solid #ffb232;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border-radius: 1px;
    }
  }
  p {
    margin-left: 5px;
    &::after {
      content: "";
      width: 6px;
      height: 6px;
      display: block;
      border-right: 1px solid #ffb232;
      border-bottom: 1px solid #ffb232;
      transform: rotate(-45deg) translateY(5px);
    }
  }
}

.topHide {
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 12px;
  .topHideli {
    margin-top: 20px;
    color: #797d82;
  }
  .topHideLable {
    position: relative;
    display: inline;
    float: left;
    height: 100%;
    text-align: center;
    padding: 0 6px;
    margin: 0 2.5px;
    font-size: 10px;
    color: #ffb232;
    &::after {
      content: "";
      transform: scale(0.5);
      position: absolute;
      border: 1px solid #ffb232;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border-radius: 1px;
    }
  }
  .topHideRight {
    padding: 0 0 0 70px;
    line-height: 15px;
  }
}

:deep(.van-hairline--bottom:after) {
  border: none;
}
</style>
