interface InitialMouse {
  button: number,
  clientX: number,
  clientY: number,
  pageUnscaledX: number,
  pageUnscaledY: number
}
let initialMouse: InitialMouse | null = null
let currentScale = 1

function zoom (mouseEvent: MouseEvent) {
  if (!mouseEvent.altKey || !mouseEvent.ctrlKey) {
    initialMouse = null
    return
  }
  if (!initialMouse) {
    initialMouse = {
      button: mouseEvent.button,
      clientX: mouseEvent.clientX,
      clientY: mouseEvent.clientY,
      pageUnscaledX: mouseEvent.pageX / currentScale,
      pageUnscaledY: mouseEvent.pageY / currentScale
    }
  }
  currentScale = Math.max(1, currentScale - mouseEvent.movementY / 100)
  document.documentElement.style.transformOrigin = '0 0'
  document.documentElement.style.transform = `scale(${currentScale})`
  window.scrollTo(
    initialMouse.pageUnscaledX * currentScale - initialMouse.clientX,
    initialMouse.pageUnscaledY * currentScale - initialMouse.clientY
  )
}

window.addEventListener('mousemove', zoom)
