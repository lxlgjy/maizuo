import { http } from './http'


// Initiate an Ajax request to obtain data
export const https = (list: any, data: any, type: number, cityId: number) => {
    http({
        url: `/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=${type}&k=5797068`,
        method: 'GET',
        headers: {
            'X-Host': 'mall.film-ticket.film.list'
        }
    }).then((res: any) => {
        list.value = res.data.data.films
        data.total = res.data.data.total
    })
}

//Request the details interface to obtain the fimes ID
export const getAsyncFlimesId = (detailId: number, cityId: number) => {
    return new Promise(resolve => {
        http({
            url: `/gateway/?filmId=${detailId}&cityId=${cityId}&k=9764477`,
            method: 'GET',
            headers: {
                'X-Host': 'mall.film-ticket.cinema.film-show-cinema'
            }
        }).then(res => {
            let shoplist = res.data.data.showCinemas
            resolve(shoplist)

        })
    })

}

export const getALLCinmes = (cityId:string , cinemaIds:string | string[]) => {
    return new Promise(resolve => {
        http({
            url: '/gateway?k=9876608',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Host': 'mall.film-ticket.cinema.batch-cinema'
            },
            data: {
                "cityId": cityId, "cinemaIds": cinemaIds
            }
        }).then(res => {
            resolve(res.data.data.cinemas)
            
        })
    })
  
}

export const getCinmesDetaliList = (cinmesId:string,xHost:string , filmesId?:string , dataTime?:string) => {
    return new Promise(resolve => {
        http({
            url:`/gateway/?cinemaId=${cinmesId}&k=8765327`,
            method:'GET',
            headers:{
                'X-Host': xHost
            }
        }).then(res => {
            resolve(res.data.data)
        })
    })
}

export const shwoTimelist = (flimesID:string , cinmesID:string ,Time:string) => {
    return new Promise(resolve => {
        http({
            url:`/gateway/?filmId=${flimesID}&cinemaId=${cinmesID}&date=${Time}&k=3687761`,
            method:'GET',
            headers:{
                'X-Host': 'mall.film-ticket.schedule.list'
            }
        }).then(res => {
            if(res.data.data) {
                resolve(res.data.data.schedules)

            } else {
                resolve([])
            }
        })
    })
  
}

//Filter data
export const author = (author: any) => {
    let authorName = []
    if (author) {
        for (const x of author) {
            authorName.push(x['name'])
        }
    } else {
        return '暂无主演'
    }
    return authorName.toString().replace(',', '')
}

// Lazy load list
export const lasyList = (loading: any, finished: any, list: any, data: any, type: number, cityId: number) => {

    if (list.value.length === data.total && data.total !== 0) {
        finished.value = true
        return
    }

    data.current++

    http({
        url: `/gateway?cityId=${cityId}&pageNum=${data.current}&pageSize=10&type=${type}&k=4689148`,
        method: 'GET',
        headers: {
            'X-Host': 'mall.film-ticket.film.list'
        }
    }).then((res: any) => {
        list.value = [...list.value, ...res.data.data.films as never]
        loading.value = false

    })
}
