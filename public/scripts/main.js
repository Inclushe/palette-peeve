import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'
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
          lightness: 95
        },
        200: {
          hue: 141,
          saturation: 77,
          lightness: 88
        },
        300: {
          hue: 141,
          saturation: 80,
          lightness: 71
        },
        400: {
          hue: 141,
          saturation: 75,
          lightness: 65
        },
        500: {
          hue: 141,
          saturation: 75,
          lightness: 48
        },
        600: {
          hue: 141,
          saturation: 77,
          lightness: 38
        },
        700: {
          hue: 130,
          saturation: 44,
          lightness: 32
        },
        800: {
          hue: 104,
          saturation: 70,
          lightness: 19
        },
        900: {
          hue: 108,
          saturation: 92,
          lightness: 12
        }
      }
    },
    currentlySelectedShade: null,
    clipboard: null
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
    setSelectedShade (state, { name, shade }) {
      state.currentlySelectedShade = { name, shade }
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
    }
  }
})

const app = new Vue({
  el: '#app',
  store,
  data: {
    test: 'hello',
    currentColor: 'green'
  },
  methods: {
    shadeToHSL (shade) {
      return `hsl(${this.currentPalette[shade].hue}deg, ${this.currentPalette[shade].saturation}%, ${this.currentPalette[shade].lightness}%)`
    },
    setUndoState () {
      this.$store.commit('setUndoState')
    },
    undo () {
      this.$store.commit('undo')
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
      // console.log(e)
      // if (e.key.toLowerCase() === 'a') {
      //   console.log('setUndoState')
      //   e.preventDefault()
      //   this.$store.commit('setUndoState')
      // }
      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
        console.log('undo')
        e.preventDefault()
        this.$store.commit('undo')
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
        console.log('redo')
        e.preventDefault()
        this.$store.commit('redo')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'c' && this.currentlySelectedShade) {
        console.log('copy')
        e.preventDefault()
        this.$store.commit('copy')
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'v' && this.currentlySelectedShade) {
        console.log('paste')
        e.preventDefault()
        this.$store.commit('paste')
      }
    })
  }
})
