import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from './router/index'
import List from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.css';
import { Swipe, SwipeItem } from 'vant';

//?创建pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)

//?挂在在根实例

app.use(pinia)
app.use(router)
app.use(List)
app.use(Swipe)
app.use(SwipeItem)

app.mount('#app')
