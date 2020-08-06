import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'
import Color from './../components/Color'

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
    }
  },
  mutations: {
    setPalette (state, { name, shade, type, value }) {
      // console.log(key, value)
      this.state.palettes[name][shade][type] = value
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
    }
  },
  computed: mapState({
    currentPalette (state) {
      return state.palettes[this.currentColor]
    }
  }),
  components: {
    Color
  }
})
