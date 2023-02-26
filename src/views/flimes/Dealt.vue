<template>
  <div v-if="detaliList">
    <div>
      <div class="box">
        <div class="box-header" v-scroll>
          <div class="img-top">
            <img alt="" src="../../assets/arrow-left-bold.png" @click="callback" />
          </div>
          <div class="text-top">
            <div class="txt-top">{{ detaliList['name'] }}</div>
          </div>
        </div>
        <div class="box-img">
          <div class="poster">
            <img :alt="detaliList['name']" :src="detaliList['poster']">
          </div>
        </div>
        <!--  -->
        <div class="detaliList">
          <div class="titleAndgrade">
            <div class="title">
              <span>{{ detaliList['name'] }}</span>
              <span>{{ detailFileName }}</span>
            </div>
            <div class="grade">
              <span>{{ detaliList['grade'] || 0 }}分</span>
            </div>
          </div>
          <div class="moonik">
            <span>{{ detaliList['category'] }}</span>
            <span>{{ TimeSeion(detaliList['premiereAt']) }}上映</span>
            <span>{{ detaliList['nation'] }} | {{ detaliList['runtime'] }}分</span>
          </div>
          <div class="introduce">
            <div class="show">
              {{ detaliList['synopsis'] }}
            </div>
          </div>
          <div class="toggle">
            <img alt="" src="../../assets/toggle.png" @click="DetailDisplay">
          </div>
        </div>
        <!--  -->
        <div class="actors">
          <div class="members">
            <span>演职人员</span>
          </div>
          <div class="actors-img">
            <ul>
              <van-swipe :loop="false" :width="100" :show-indicators="false">
                <van-swipe-item v-for="(item, index) in detaliList['actors']" :key="index"
                  class="swiper-slide swiperImg li">
                  <div class="avatarAddress">
                    <img :src="item['avatarAddress']" alt="">
                  </div>
                  <span>{{ item['name'] }}</span>
                  <span>{{ item['role'] }}</span>
                </van-swipe-item>
              </van-swipe>
            </ul>
          </div>
        </div>
        <!--  -->
        <div class="actors" style="margin-bottom: 60px">
          <div class="members">
            <span>剧照</span>
          </div>
          <div class="actors-img" style="height: 115px">
            <ul v-if="detaliList['photos']">
              <van-swipe :loop="false" :width="170" :height="250" :show-indicators="false">
                <van-swipe-item v-for="(item, index) in detaliList['photos']" :key="index" class="swiper-slide swiperImg li">
                  <div class="avatarAddress" style="width:150px;height:100px">
                    <img :src="item" alt="" @click="handerimg(index, detaliList)">
                  </div>
                </van-swipe-item>
              </van-swipe>
            </ul>
            <div v-else class="none-actors">
              暂无电影剧照
            </div>
          </div>
        </div>
        <!--  -->
        <div class="shopping" @click="TicketPurchaseInterface">
          <span>选座购票</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '../../store';
import { http } from '../../uilt/http'
import { time } from '../../uilt/Time'
import { slide } from '../../uilt/slide'
import { showImagePreview } from 'vant'

//data


let detaliList = ref() as any
let detailFileName = ref('')

//route and router and store
const route = useRoute()
const mainStore = useMainStore()
const router = useRouter()

// footer hide And show
mainStore.hide()

onUnmounted(() => {
  mainStore.show()
})

onMounted(() => {
  let urlId = route.params.id

  //页面http请求
  http({
    url: `/gateway?filmId=${urlId}&k=9270116`,
    method: 'GET',
    headers: {
      'X-Host': 'mall.film-ticket.film.info'
    }
  }).then(res => {
    detaliList.value = res.data.data.film
    detailFileName.value = res.data.data.film.filmType.name
  })
})

// 格式化时间
const TimeSeion = (times: number) => {
  return time(times, true)
}

//Picture preview
const handerimg = (index: number, els: any) => {
  showImagePreview({
    images: els.photos,
    startPosition: index,
  })
}

//Detail display switching
const DetailDisplay = () => {
  slide()
}

const callback = () => {
  router.back()
}

//
const TicketPurchaseInterface = () => {
  let paremsId = route.params.id as string
  let paremsName = detaliList.value['name']
  //pinia Persistence
  mainStore.getdetaliId(paremsId)
  mainStore.getdetaliName(paremsName)

  router.push({
    name: 'Shopping',
  })
}

//Custom vue3 directive
const vScroll = {
  mounted(el: any) {
    const img_scoll = el.querySelector('.img-top')
    const text_scoll = el.querySelector('.text-top')

    text_scoll.style.display = 'none'
    window.onscroll = () => {
      const scoll = document.documentElement.scrollTop || document.body.scrollTop

      if (scoll > 50) {
        text_scoll.style.position = 'fixed'
        text_scoll.style.display = 'block'
        text_scoll.style.zIndex = 20
        img_scoll.style.background = '#fff'
      } else {
        text_scoll.style.display = 'none'
        img_scoll.style.background = 'rgb(243, 239, 239,.4)'
      }
    }
  },
  unmounted() {
    window.onscroll = null
  }

}

</script>

<style lang="scss" scoped>
body {
  box-sizing: border-box;
  overflow-x: hidden;
}

.box {
  width: 100%;
  position: relative;
  box-sizing: border-box;

  .box-header {
    width: 100%;
    position: absolute;
    height: 44px;

    .img-top {
      position: fixed;
      top: 5px;
      left: 5px;
      z-index: 22;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background: rgb(243, 239, 239, .4);
      text-align: center;

      img {
        width: 27px;
        height: 27px;
      }
    }

    .text-top {
      width: 100%;
      height: 42px;
      line-height: 42px;
      top: 0;

      .txt-top {
        position: absolute;
        text-align: center;
        width: 100%;
        z-index: 30;
        font-size: 17px;
        color: #191a1b;
        background: #fff;
      }

    }
  }

  .box-img {
    position: relative;
    background: #fff;

    //整体img居中样式
    .poster {
      width: 23.4375rem;
      height: 13.125rem;
      position: relative;
      overflow: hidden;
      top: 0;

      img {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-position: center;
      }
    }
  }

  .detaliList {
    padding: 0.75rem 0.9375rem 0.9375rem;
    background: #fff;

    .titleAndgrade {
      display: flex;

      .title {
        flex: 2;

        span:nth-child(1) {
          font-size: 1.125rem;
          margin-right: 0.4375rem;
          height: 1.5rem;
          line-height: 1.5rem;
          color: #191a1b;
          vertical-align: middle;
        }

        span:nth-child(2) {
          background: #d2d6dc;
          height: 0.875rem;
          line-height: 0.875rem;
          padding: 0 0.125rem;
          border-radius: 0.125rem;
          font-size: 0.75rem;
          color: #fff;
          vertical-align: middle;
        }
      }

      .grade {
        flex: 1;

        span {
          float: right;
          text-align: right;
          color: #ffb231;
          font-size: 1.125rem;
        }
      }
    }

    .moonik {
      display: flex;
      flex-direction: column;
      color: #797d82;

      span {
        flex: 1;
        margin-top: 0.25rem;
      }
    }

    .introduce {
      margin-top: 0.75rem;
      color: #797d82;
      height: 2.1875rem;
      overflow: hidden;
      transition: all 0.5s;
    }

    .toggle {
      text-align: center;
      width: 1.25rem;
      display: block;
      margin: auto;
      line-height: normal;
      z-index: 1;

      img {
        width: 0.75rem;
        margin: auto;
      }
    }
  }

  .actors {
    margin-top: 10px;
    background: #fff;

    .members {
      box-sizing: border-box;
      width: 100%;
      padding: 15px;

      span {
        font-size: 16px;
      }
    }

    .actors-img {
      height: 148px;
      overflow-x: auto;
      overflow-y: hidden;

      ul {
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        padding-left: 15px;
        width: 100%;
        position: relative;

        .li {
          position: relative;

          .avatarAddress {
            width: 85px;
            height: 85px;
            display: flex;
            position: relative;
            overflow: hidden;

            img {
              width: 100%;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
          }

          span {
            display: block;
            text-align: center;
            width: 85px;
            height: 18px;
            font-size: 12px;
          }

          span:nth-child(2) {
            text-align: center;
            padding-top: 10px;
          }

          span:nth-child(3) {
            color: #797d82;
          }
        }
      }

      .none-actors {
        font-size: 14px;
        color: #bdc0c5;
        margin: auto;
        text-align: center;

        height: 115px;
        line-height: 58px;
      }
    }
  }

  .shopping {
    width: 100%;
    height: 49px;
    background: #ff5f16;
    position: fixed;
    bottom: 0;
    z-index: 10;

    span {
      display: block;
      text-align: center;
      line-height: 49px;
      font-size: 16px;
      color: #fff;
    }
  }

}
</style>
