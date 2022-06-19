<template>
  <div class="nowplaying">
    <div></div>
    <div class="nowpying-power" v-slide>
      <ul>
        <router-link
          v-slot="{ navigate, isActive }"
          custom
          to="/Filems/Nowpying"
        >
          <li :class="isActive ? 'lxl' : ''" @click="navigate">
            <span>正在热映</span>
          </li>
        </router-link>
        <router-link
          v-slot="{ navigate, isActive }"
          custom
          to="/Filems/Cheamlist"
        >
          <li :class="isActive ? 'lxl' : ''" @click="navigate">
            <span>即将上映</span>
          </li>
        </router-link>
        </ul>
      <div class="naiver">
        <span></span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { slideHeader } from "../../uilt/slideHeader";
import { onMounted  } from "vue";


//onMounted
onMounted(() => {
  slideHeader();
});

// hoscks
const vSlide = {
  mounted(el: any) {
    window.onscroll = () => {
      const scoll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scoll > 211) {
        el.style.position = "sticky";
        el.style.top = -1 + "px";
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.van-notice-bar:nth-child(1) {
  border-bottom: 1px solid #e1d6a7;
}

.nowplaying {
  height: 100%;
  overflow: visible;
  position: relative;

  .nowpying-power {
    font-size: 0.875rem;
    height: 49px;
    line-height: 49px;
    z-index: 100;
    background: #fff;

    ul {
      display: flex;

      li {
        flex: 1;
        width: 50%;
        text-align: center;
      }
    }

    .naiver {
      height: 2px;
      position: relative;
      z-index: 10;
      width: 50%;
      left: 0;
      top: -4px;
      transition: left 0.2s;

      span {
        display: block;
        height: 100%;
        width: 56px;
        border-bottom: 2px solid #ff5f16;
        margin: auto;
      }
    }
  }
}
</style>
