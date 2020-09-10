export default {
  state: {
    text: '',
    keyboard: '',
    style: {}
  },
  mutations: {
    moveTooltipAboveElement (state, element) {
      const tooltipElement = document.querySelector('#tooltip')
      state.text = element.dataset.tooltipInfo || ''
      state.keyboard = element.dataset.tooltipKeys || ''
      window.setTimeout(() => {
        const elementRect = element.getBoundingClientRect()
        const tooltipRect = tooltipElement.getBoundingClientRect()
        let leftInt = elementRect.left - (tooltipRect.width / 2) + (elementRect.width / 2)
        let topInt = elementRect.top - tooltipRect.height
        if (leftInt < 0) {
          leftInt = 0
        }
        if (topInt < 0) {
          topInt = 0
        }
        state.style = {
          left: leftInt + 'px',
          top: topInt + 'px',
          opacity: 1
        }
      }, 1)
    },
    hideTooltip (state) {
      state.style = {
        left: state.style.left,
        top: state.style.top,
        opacity: 0
      }
    }
  }
}