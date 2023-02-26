import { useRouter } from "vue-router"
export const slideHeader = () => {
  const Nowpying = <HTMLLIElement>document.querySelector('.nowpying-power ul li:nth-child(1)')
  const Cheamlist = <HTMLLIElement>document.querySelector('.nowpying-power ul li:nth-child(2)')
  const hus = document.querySelector('.naiver') as HTMLDivElement

  const router = useRouter()
  //获取不到window
  // _rawValue 无法识别 router.currentRoute._rawValue.href
  
  if (window.history.state.current=== '/Filems/Cheamlist') {
    hus.style.left = 188 + 'px'
    Cheamlist.style.color = '#ff5f16'
  } else if (window.history.state.current === '/Filems/Nowpying') {
    hus.style.left = 0 + 'px'
    Nowpying.style.color = '#ff5f16'
  }

  Nowpying.onclick = function () {
    hus.style.left = 0 + 'px'
    Nowpying.style.color = '#ff5f16'
    Cheamlist.style.color = '#000'
  }

  Cheamlist.onclick = function () {
    hus.style.left = 188 + 'px'
    Cheamlist.style.color = '#ff5f16'
    Nowpying.style.color = '#000'
  }
}
