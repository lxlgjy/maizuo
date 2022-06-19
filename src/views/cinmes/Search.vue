<template>
  <div>
      <van-search
        v-model="data.value"
        show-action
        placeholder="请输入搜索关键词"
        @input="changevan"
        @cancel="onCancel"
      />
    <city-list :citylist="citylist" v-if="data.value"></city-list>
  </div>
</template>

<script lang="ts" setup>
import CityList from '../../components/cinmes/citylist.vue'
import { useMainStore } from '../../store';
import { useRouter } from 'vue-router';
import { onMounted ,computed ,onUnmounted, reactive} from 'vue';

// const value = ref()
const data = reactive({
    value:''
})

const mainStore = useMainStore()
const router = useRouter()
// mainStore

const citylist = computed(() => {
    return mainStore.citylist.filter((item:any) => item['name'].toUpperCase().includes(data.value.toUpperCase()) || item['address'].toUpperCase().includes(data.value.toUpperCase()) )
})

//footer hide And show
mainStore.hide();
onUnmounted(() => {
  mainStore.show();
});

const changevan = () => {}
const onCancel = () => {
    router.back()
}
onMounted(() => {
    if(mainStore.citylist.length === 0 ) {
        mainStore.getcitylist()
    } else {
        // 缓存
    }
})

</script>
