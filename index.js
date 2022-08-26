// Initialize Wow.js
new WOW({ mobile: false }).init()

// Find heights of each box
const innerBoxes = document.querySelectorAll('.innerBox')
innerBoxes.forEach(innerBox => {
  const titleHeight = innerBox.children[0].offsetHeight + 'px'
  const descHeight = innerBox.children[1].offsetHeight + 'px'
  innerBox.style.setProperty('--titleHeight', titleHeight)
  innerBox.style.setProperty('--descHeight', descHeight)
})