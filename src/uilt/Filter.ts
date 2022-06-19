export const Filter = (citys:any[]) => {
    return new Promise(resolve => {
        const letter = []
        const city:any[] = []
        for (let i = 65; i < 91; i++) {
            letter.push(String.fromCharCode(i))
        }
        letter.forEach(letter => {
            const newlist = citys.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
            newlist.length > 0 && city.push({
                letter,
                citys: newlist
            })
        })
        resolve(city)
    })
}