<template>
  <div>
    <ul>
      <li v-for="item in props.citylist" @click="ss(item['cinemaId'])">
        <a href="javascript:">
          <div class="address">
            <span>{{ item['name'] }}</span>
            <span>{{ item['address'] }}</span>
          </div>
          <div class="price">
            <span>{{ '￥' }}{{ item['lowPrice'] / 100 }}{{ '起' }}</span>
            <span>{{ '距离未知' }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useMainStore } from '../../store';

const router = useRouter()
const mainStore = useMainStore()

const props = defineProps({
  citylist: {
    type: Object,
    default: ''
  }
})

const ss = (cinmesId:string) => {
  mainStore.getCinmesList(cinmesId)
  router.push({
    name:'CinmesDetali',
    params:{
      cinmesId
    }
  })
  
}



</script>

<style lang="scss" scoped>
ul {
  background: #fff;

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
}
</style>
