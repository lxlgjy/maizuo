export const time = (times: number, type: Boolean) => {
    if (type == true) {
        const date = new Date(times * 1000)

        const year = date.getFullYear()
        let mouth = date.getMonth() + 1
        mouth = mouth < 10 ? 0 + mouth : mouth
        let day = date.getDate()
        day = day < 10 ? 0 + day : day

        const filmtime = `${year}-${mouth}-${day}`
        return filmtime
    } else {
        const data = new Date(times * 1000)
        const h = data.getMonth() + 1
        const d = data.getDate()
        const datelist = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

        const w = data.getDay()

        return `周${datelist[w].substring(1, 2)}  ${h}月${d}日`
    }

}

// There is a problem with the date display on the ticket purchase interface. I haven't thought of any method yet
export const shopListTime = (times: number, type?: Boolean) => {
    if (type !== undefined) {
        const date = new Date(times * 1000)

        let Hours = date.getHours()
        Hours = Hours < 10 ? 0 + Hours : Hours
        let Minutes:string | number = date.getMinutes()
        Minutes = Minutes < 10 ? 0 + Minutes : Minutes
        Minutes = Minutes <= 0 ? '00' : Minutes
        const cinmesTime = `${Hours}:${Minutes}`
        return cinmesTime
    } else {
        const date = new Date(times * 1000)

        let mouth = date.getMonth() + 1
        mouth = mouth < 10 ? 0 + mouth : mouth
        let day = date.getDate()
        day = day < 10 ? 0 + day : day

        const datelist = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

        const w = date.getDay()

        return `${datelist[w]}${mouth}月${day}日`
    }

}