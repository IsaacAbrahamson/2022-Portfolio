// Initialize Wow.js
new WOW({ mobile: false }).init()

// Calculate the heights for boxes
const innerBoxes = document.querySelectorAll('.innerBox')
calcHeights(innerBoxes)

// Always top of page on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// Always recalculate the box heights whenever size changes
window.addEventListener('resize', function (event) {
  calcHeights(innerBoxes)
})

// Calculates the height of boxes and adds a variable
function calcHeights(boxes) {
  boxes.forEach(box => {
    const titleHeight = box.children[0].offsetHeight + 'px'
    const descHeight = box.children[1].offsetHeight + 'px'
    box.style.setProperty('--titleHeight', titleHeight)
    box.style.setProperty('--descHeight', descHeight)
  })
}