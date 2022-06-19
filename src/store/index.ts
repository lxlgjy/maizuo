import { defineStore } from "pinia";
import { http } from '../uilt/http'

// 定义容器导出容器

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            cityName: '上海',
            detaliName:'',
            detaliId:'',
            cityId: '310100',
            isheadertop: true,
            citylist: [],
            cinmestopNum: 1,
            cinmesfooter: 1,
            detailShoppingList: [],
            shopGetDateList:[],
            cinmesDetaliList:[]
        }
    },
    getters: {
    },
    actions: {
        show() {
            this.isheadertop = true
        },
        hide() {
            this.isheadertop = false
        },
        getdetaliName(detaliname:string) {
            this.detaliName = detaliname
        },
        getdetaliId(detaliid:string) {
            this.detaliId = detaliid 
        },
        getCinmesBtn(height: any) {
            this.cinmesfooter = height
        },
        getshopList(list:any) {
            this.shopGetDateList = list
        },
        getCinmesList(list:any) {
            this.cinmesDetaliList = list
        },
        clearcitylist() {
            this.citylist = []
        },
        changeName(cityName: string) {
            this.cityName = cityName
        },
        changeId(cityId: string) {
            this.cityId = cityId
        },
        changeShoplist(shoplist: any) {
            this.detailShoppingList = shoplist
        },
        async getcitylist() {
            const res = await http({
                method: 'GET',
                url: `/gateway?cityId=${this.cityId}&ticketFlag=1&k=4545544`,
                headers: {
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            });
            this.citylist = res.data.data.cinemas;
            
        },
        async getCinmesTop(height: any) {
            this.cinmestopNum = height
        },
    },
    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key
                key: 'maizuoDate',
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ['cityName','cityId','detailShoppingList','detaliName','detaliId','cinmesDetaliList','citylist'],
            }
        ]
    },

})

//使用容器

//修改state

//容器的action使用