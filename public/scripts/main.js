import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import store from './store'
import Color from './../components/Color'
import UIButton from './../components/UIButton'
import Tooltip from './../components/Tooltip'
import Ripple from './../components/Ripple'
import Sidebar from './../components/Sidebar'
import Modal from './../components/Modal'
import icons from './../images/icons/*.svg'

const app = new Vue({
  el: '#app',
  store,
  data: {
    icons,
    currentColor: 0
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
    ...mapMutations(['copy', 'paste', 'undo', 'redo', 'saveUndoState', 'toggleVisibility', 'hoverStart', 'hoverEnd', 'rippleStart', 'rippleEnd', 'exportToFile'])
  },
  computed: {
    currentPaletteName: {
      get: function () {
        return this.currentPalette.name
      },
      set: function (newValue) {
        this.$store.commit('setPaletteName', {
          index: 0,
          newName: newValue
        })
      }
    },
    ...mapState({
      currentPalette (state) {
        return state.palettes[this.currentColor]
      },
      currentlySelectedShade (state) {
        return state.currentlySelectedShade
      },
      dragged: (state) => state.dragged,
      showingSidebar: (state) => state.showingSidebar
    })
  },
  components: {
    Color,
    'ui-button': UIButton,
    Tooltip,
    Ripple,
    Sidebar,
    Modal
  },
  mounted () {
    this.$store.commit('saveUndoState')
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
        this.$store.commit('saveUndoState')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'd' && this.currentlySelectedShade) {
        console.log('toggleVisibility')
        e.preventDefault()
        this.showRippleForAction('toggleVisibility')
        this.$store.commit('toggleVisibility')
        this.$store.commit('saveUndoState')
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        console.log('showSidebar')
        e.preventDefault()
        this.showRippleForAction('showSidebar')
        this.$store.commit('showSidebar')
      }
    })
  }
})
