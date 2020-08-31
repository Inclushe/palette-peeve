import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import store from './store'
import Color from './../components/Color'
import UIButton from './../components/UIButton'
import Tooltip from './../components/Tooltip'
import Ripple from './../components/Ripple'
import icons from './../images/icons/*.svg'

const app = new Vue({
  el: '#app',
  store,
  data: {
    icons,
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
    showRippleForAction (action) {
      const element = document.querySelector(`a.button[data-action=${action}]`)
      if (element) {
        this.$store.commit('moveRippleToElement', element)
        this.$store.commit('rippleStart')
        setTimeout(() => { this.$store.commit('rippleEnd'); this.$store.commit('hoverEnd') }, 150)
      }
    },
    ...mapMutations(['copy', 'paste', 'undo', 'redo', 'setUndoState', 'toggleVisibility', 'hoverStart', 'hoverEnd', 'rippleStart', 'rippleEnd'])
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
    Color,
    'ui-button': UIButton,
    Tooltip,
    Ripple
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
        this.$store.commit('setUndoState')
        console.log('paste')
        e.preventDefault()
        this.showRippleForAction('paste')
        this.$store.commit('paste')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'd' && this.currentlySelectedShade) {
        this.$store.commit('setUndoState')
        console.log('toggleVisibility')
        e.preventDefault()
        this.showRippleForAction('toggleVisibility')
        this.$store.commit('toggleVisibility')
      }
    })
  }
})
