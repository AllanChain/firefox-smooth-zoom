let initialClientX = 0
let initialClientY = 0
let initialPageUnscaledX = 0
let initialPageUnscaledY = 0
let currentScale = 1

function zoom(mouseEvent) {
  initialClientX = initialClientX || mouseEvent.clientX
  initialClientY = initialClientY || mouseEvent.clientY
  initialPageUnscaledX = initialPageUnscaledX || mouseEvent.pageX / currentScale
  initialPageUnscaledY = initialPageUnscaledY || mouseEvent.pageY / currentScale
  currentScale = Math.max(1, currentScale - mouseEvent.movementY / 100)
  document.documentElement.style.transformOrigin = '0 0'
  document.documentElement.style.transform = `scale(${currentScale})`
  window.scrollTo(
    initialPageUnscaledX * currentScale - initialClientX,
    initialPageUnscaledY * currentScale - initialClientY
  )
}

// Add event listener when user presses ctrl key and alt key
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey) {
    window.addEventListener('mousemove', zoom)
  }
})
// remove event listener when user releases ctrl key and alt key
window.addEventListener('keyup', (e) => {
  if (!e.ctrlKey && !e.altKey) {
    window.removeEventListener('mousemove', zoom)
    initialClientX = 0
    initialClientY = 0
    initialPageUnscaledX = 0
    initialPageUnscaledY = 0
  }
})
