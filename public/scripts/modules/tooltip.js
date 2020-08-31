export default {
  state: {
    text: '',
    keyboard: '',
    style: {}
  },
  mutations: {
    moveTooltipAboveElement (state, element) {
      const tooltipElement = document.querySelector('#tooltip')
      state.text = element.dataset.tooltipInfo
      state.keyboard = element.dataset.tooltipKeys
      window.setTimeout(() => {
        const elementRect = element.getBoundingClientRect()
        const tooltipRect = tooltipElement.getBoundingClientRect()
        state.style = {
          left: elementRect.left - (tooltipRect.width / 2) + (elementRect.width / 2) + 'px',
          top: elementRect.top - tooltipRect.height + 'px',
          opacity: 1
        }
      }, 25)
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