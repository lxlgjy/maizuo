export const slide = () => {
  // const hide = document.querySelector('.hide') as HTMLDivElement

  const show = document.querySelector('.show') as HTMLDivElement

  const introduce = document.querySelector('.introduce') as HTMLDivElement

  if (introduce.offsetHeight === 35 || introduce.offsetHeight === 34) {
    introduce.style.height = show.offsetHeight + 'px'
  } else {
    introduce.style.height = 34 + 'px'
  }
}
