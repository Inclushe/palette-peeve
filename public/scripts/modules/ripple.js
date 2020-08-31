export default {
  state: {
    style: {}
  },
  mutations: {
    rippleStart (state) {
      const rippleElement = document.querySelector('#ripple')
      if (!rippleElement.classList.contains('ripple--active')) {
        rippleElement.classList.add('ripple--active')
      }
    },
    rippleEnd (state) {
      const rippleElement = document.querySelector('#ripple')
      if (rippleElement.classList.contains('ripple--active')) {
        rippleElement.classList.remove('ripple--active')
        console.log(rippleElement)
      }
    },
    moveRippleToElement (state, element) {
      const rippleElement = document.querySelector('#ripple')
      if (!element.classList.contains('button--disabled') && element.dataset.ripple) {
        window.setTimeout(() => {
          const elementRect = element.getBoundingClientRect()
          const rippleRect = rippleElement.getBoundingClientRect()
          state.style = {
            left: elementRect.left - (96 / 2) + (elementRect.width / 2) + 'px',
            top: elementRect.top - (96 / 2) + (elementRect.height / 2) + 'px',
            opacity: 1
          }
        })
      }
    },
    hideRipple (state) {
      state.style = {
        left: state.style.left,
        top: state.style.top,
        opacity: 0
      }
    }
  }
}