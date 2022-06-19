<template>
    <footer v-show="mainStore.isheadertop">
      <ul>
        <router-link v-slot="{ navigate, isActive }" custom to="/Filems">
          <li :class="isActive ? 'lxl' : ''" @click="navigate">电影</li>
        </router-link>

        <router-link v-slot="{ navigate, isActive }" custom to="/Cinmes">
          <li :class="isActive ? 'lxl' : ''" @click="navigate">影院</li>
        </router-link>

        <router-link v-slot="{ navigate, isActive }" custom to="/Center">
          <li :class="isActive ? 'lxl' : ''" @click="navigate">我的</li>
        </router-link>
      </ul>
    </footer>
</template>
<script lang="ts" setup>
import { useMainStore } from "../../store";
const mainStore = useMainStore();
</script>
<style lang="scss" scoped>
footer {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 49px;
  background: white;
  color: #bdc0c5;
  width: 100%;
  z-index: 1;
  border-top: 1px solid #ededed;
  ul {
    display: flex;
    list-style: none;
    li {
      font-size: 0.1875rem;
      background: white;
      flex: 1;
      text-align: center;
      line-height: 49px;
      cursor: pointer;
    }
  }
}

.lxl {
  color: #ff5f16;
}
</style>
