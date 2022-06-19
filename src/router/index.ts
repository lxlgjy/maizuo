import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
//vue Blockbuster movie import component
import Filems from '../views/Filems.vue'
import Center from '../views/Center.vue'
import Cinmes from '../views/Cinmes.vue'
import Nowpying from '../views/flimes/Nowpying.vue'
import Cheamlist from '../views/flimes/Cheamlist.vue'
import Dealt from '../views/flimes/Dealt.vue'
import Search from '../views/cinmes/Search.vue'
import NationalCities from '../views/cinmes/NationalCities.vue'
import Shopping from '../views/Shopping.vue'
import CinmesDetali from '../views/cinmes/CinmesDetali.vue'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/Filems',
        name: 'filems',
        component: Filems,
        redirect:'/Filems/Nowpying',
        children: [
            {
              path: '/Filems/Nowpying',
              component: Nowpying
            },
            {
              path: '/Filems/Cheamlist',
              component: Cheamlist
            },
          ]
    },
    {
        path: '/Cinmes',
        component: Cinmes
    },
    {
        path: '/Center',
        component: Center
    },
    {
      name:'Dealt',
      path: '/Filems:id',
      component:Dealt
    },
    {
      name:'NationalCities',
      path:'/Cinmes/NationalCities',
      component:NationalCities
    },
    {
      name:'CinmesDetali',
      path:'/Cinmes/CinmesDetali',
      component:CinmesDetali,
    },
    {
      name: 'Search',
      path: '/Cinmes/Search',
      component: Search
    },
    {
      name:'Shopping',
      path:'/Filmes/Dealt:id/Shopping',
      component:Shopping
    },
    {
      path:"/:pathMatch(.*)",
      redirect:'/Filems/Nowpying'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router