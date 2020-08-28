import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapMutations } from 'vuex'
import Color from './../components/Color'
const undoStates = []
var undoIndex = -1

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    palettes: {
      green: {
        100: {
          hue: 141,
          saturation: 100,
          lightness: 95,
          hidden: false
        },
        200: {
          hue: 141,
          saturation: 77,
          lightness: 88,
          hidden: false
        },
        300: {
          hue: 141,
          saturation: 80,
          lightness: 71,
          hidden: false
        },
        400: {
          hue: 141,
          saturation: 75,
          lightness: 65,
          hidden: false
        },
        500: {
          hue: 141,
          saturation: 75,
          lightness: 48,
          hidden: false
        },
        600: {
          hue: 141,
          saturation: 77,
          lightness: 38,
          hidden: false
        },
        700: {
          hue: 130,
          saturation: 44,
          lightness: 32,
          hidden: false
        },
        800: {
          hue: 104,
          saturation: 70,
          lightness: 19,
          hidden: false
        },
        900: {
          hue: 108,
          saturation: 92,
          lightness: 12,
          hidden: false
        }
      }
    },
    currentlySelectedShade: null,
    clipboard: null,
    dragged: false,
    hovering: false,
    hoverElement: null,
    hoverTimeout: null
  },
  mutations: {
    setPalette (state, { name, shade, type, value }) {
      this.state.palettes[name][shade][type] = value
    },
    setUndoState (state) {
      undoIndex++
      undoStates[undoIndex] = (JSON.stringify(state.palettes))
      undoStates.splice(undoIndex + 1)
      // TODO: This might get too big, convert to queue
    },
    undo (state) {
      if (undoIndex - 1 >= 0) {
        undoIndex--
        state.palettes = JSON.parse(undoStates[undoIndex])
      }
    },
    redo (state) {
      if (undoIndex + 1 < undoStates.length) {
        undoIndex++
        state.palettes = JSON.parse(undoStates[undoIndex])
      }
    },
    setSelectedShade (state, obj) {
      state.currentlySelectedShade = obj
    },
    setDragged (state, bool) {
      state.dragged = bool
    },
    copy (state) {
      if (state.currentlySelectedShade !== null) {
        state.clipboard = JSON.stringify(state.palettes[state.currentlySelectedShade.name][state.currentlySelectedShade.shade])
      }
    },
    paste (state) {
      if (state.clipboard !== null) {
        state.palettes[state.currentlySelectedShade.name][state.currentlySelectedShade.shade] = JSON.parse(state.clipboard)
      }
    },
    toggleVisibility (state) {
      if (state.currentlySelectedShade !== null) {
        state.palettes[state.currentlySelectedShade.name][state.currentlySelectedShade.shade].hidden = !state.palettes[state.currentlySelectedShade.name][state.currentlySelectedShade.shade].hidden
      }
    },
    hoverStart (state, e) {
      if (this.state.hovering === false) {
        window.clearTimeout(this.state.hoverTimeout)
        this.state.hovering = true
        moveRippleToElement(e.target)
        this.commit('rippleEnd', e)
        this.state.hoverTimeout = setTimeout(() => {
          moveTooltipAboveElement(e.target)
        }, 1000)
      }
    },
    hoverEnd (state) {
      this.state.hovering = false
      window.clearTimeout(this.state.hoverTimeout)
      hideTooltip()
      hideRipple()
    },
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
    }
  }
})

function moveTooltipAboveElement (element) {
  const tooltipElement = document.querySelector('#tooltip')
  console.log(element)
  const tooltipInfoElement = tooltipElement.querySelector('#tooltipInfo')
  tooltipInfoElement.innerHTML = element.dataset.tooltipInfo

  const tooltipKeysElement = tooltipElement.querySelector('#tooltipKeys')
  let keys = element.dataset.tooltipKeys.split(',')
  let keysHTML = ''
  console.log(keys)
  if (element.dataset.tooltipKeys !== '') {
    keys.forEach((value, index) => {
      keysHTML += `<div class="tooltip--key">${value}</div>`
      if (index < keys.length - 1) {
        keysHTML += '<div>+</div>'
      }
    })
  }
  tooltipKeysElement.innerHTML = keysHTML

  const elementRect = element.getBoundingClientRect()
  const tooltipRect = tooltipElement.getBoundingClientRect()
  console.log(elementRect, tooltipElement)
  tooltipElement.style.left = elementRect.left - (tooltipRect.width / 2) + (elementRect.width / 2) + 'px'
  tooltipElement.style.top = elementRect.top - tooltipRect.height + 'px'

  tooltipElement.style.opacity = 1
}

function moveRippleToElement (element) {
  const rippleElement = document.querySelector('#ripple')
  if (!element.classList.contains('button--disabled') && element.dataset.ripple) {
    const elementRect = element.getBoundingClientRect()
    const rippleRect = rippleElement.getBoundingClientRect()
    console.log('test:', elementRect)
  
    rippleElement.style.left = elementRect.left - (96 / 2) + (elementRect.width / 2) + 'px'
    rippleElement.style.top = elementRect.top - (96 / 2) + (elementRect.height / 2) + 'px'
  
    rippleElement.style.opacity = 1
  }
}

function hideTooltip () {
  const tooltipElement = document.querySelector('#tooltip')
  tooltipElement.style.opacity = 0
}

function hideRipple () {
  const rippleElement = document.querySelector('#ripple')
  rippleElement.style.opacity = 0
}

const app = new Vue({
  el: '#app',
  store,
  data: {
    test: 'hello',
    currentColor: 'green'
  },
  methods: {
    shadeToHSL (shade) {
      return this.currentPalette[shade].hidden ? 'transparent' : `hsl(${this.currentPalette[shade].hue}deg, ${this.currentPalette[shade].saturation}%, ${this.currentPalette[shade].lightness}%)`
    },
    unsetSelectedShadeIfNotClickingShade (e) {
      console.log(e)
      this.$store.commit('setSelectedShade', null)
    },
    ...mapMutations(['copy', 'paste', 'undo', 'redo', 'setUndoState', 'toggleVisibility', 'hoverStart', 'hoverEnd', 'rippleStart', 'rippleEnd']),
    showRippleForAction (action) {
      const element = document.querySelector(`a.button[data-action=${action}]`)
      if (element) {
        moveRippleToElement(element)
        this.$store.commit('rippleStart')
        setTimeout(() => { this.$store.commit('rippleEnd'); this.$store.commit('hoverEnd') }, 150)
      }
    }
  },
  computed: mapState({
    currentPalette (state) {
      return state.palettes[this.currentColor]
    },
    currentlySelectedShade (state) {
      return state.currentlySelectedShade
    }
  }),
  components: {
    Color
  },
  mounted () {
    this.$store.commit('setUndoState')
    document.body.addEventListener('keydown', (e) => {
      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
        console.log('undo')
        e.preventDefault()
        this.showRippleForAction('undo')
        this.$store.commit('undo')
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
        console.log('redo')
        e.preventDefault()
        this.showRippleForAction('redo')
        this.$store.commit('redo')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'c' && this.currentlySelectedShade) {
        console.log('copy')
        e.preventDefault()
        this.showRippleForAction('copy')
        this.$store.commit('copy')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'v' && this.currentlySelectedShade) {
        console.log('paste')
        e.preventDefault()
        this.showRippleForAction('paste')
        this.$store.commit('paste')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'd' && this.currentlySelectedShade) {
        console.log('toggleVisibility')
        e.preventDefault()
        this.showRippleForAction('toggleVisibility')
        this.$store.commit('toggleVisibility')
      }
    })
  }
})
