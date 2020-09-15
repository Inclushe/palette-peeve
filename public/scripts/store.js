import Vue from 'vue'
import Vuex from 'vuex'
const colorNamer = require('color-namer')
import tooltip from './modules/tooltip'
import ripple from './modules/ripple'
import HSLToRGB from './helpers/HSLToRGB'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tooltip,
    ripple
  },
  state: {
    palettes: [
      {
        name: 'Green',
        customName: false,
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
    ],
    currentlySelectedShade: null,
    clipboard: null,
    dragged: false,
    hovering: false,
    showingSidebar: false,
    hoverTimeout: null,
    undoStates: [],
    undoIndex: -1,
    undoLimit: 200,
    middlePalleteTimeout: null
  },
  mutations: {
    setPalette (state, { index, shade, type, value }) {
      state.palettes[index][shade][type] = value
    },
    setPaletteName (state, { index, newName}) {
      state.palettes[index].name = newName
    },
    saveUndoState (state) {
      // Commit this *after* changing state.
      state.undoIndex++
      state.undoStates[state.undoIndex] = (JSON.stringify(state.palettes))
      state.undoStates.splice(state.undoIndex + 1)
      if (state.undoStates.length > state.undoLimit) {
        state.undoStates.splice(0, state.undoStates.length - state.undoLimit)
        state.undoIndex = state.undoStates.length - 1
      }
    },
    undo (state) {
      if (state.undoIndex - 1 >= 0) {
        state.undoIndex--
        state.palettes = JSON.parse(state.undoStates[state.undoIndex])
      }
    },
    redo (state) {
      if (state.undoIndex + 1 < state.undoStates.length) {
        state.undoIndex++
        state.palettes = JSON.parse(state.undoStates[state.undoIndex])
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
        state.clipboard = JSON.stringify(state.palettes[state.currentlySelectedShade.index][state.currentlySelectedShade.shade])
      }
    },
    paste (state) {
      if (state.clipboard !== null) {
        state.palettes[state.currentlySelectedShade.index][state.currentlySelectedShade.shade] = JSON.parse(state.clipboard)
      }
    },
    toggleVisibility (state) {
      if (state.currentlySelectedShade !== null) {
        state.palettes[state.currentlySelectedShade.index][state.currentlySelectedShade.shade].hidden = !state.palettes[state.currentlySelectedShade.index][state.currentlySelectedShade.shade].hidden
      }
    },
    showSidebar (state) {
      state.showingSidebar = true
    },
    hideSidebar (state) {
      state.showingSidebar = false
    },
    hoverStart (state, e) {
      if (state.hovering === false) {
        console.log('hoverStart')
        window.clearTimeout(state.hoverTimeout)
        state.hovering = true
        this.commit('moveRippleToElement', e.target)
        this.commit('rippleEnd', e)
        state.hoverTimeout = setTimeout(() => {
          this.commit('moveTooltipAboveElement', e.target)
        }, 1000)
      }
    },
    hoverEnd (state) {
      console.log('hoverEnd')
      state.hovering = false
      window.clearTimeout(state.hoverTimeout)
      this.commit('hideTooltip')
      this.commit('hideRipple')
    },
    middlePalleteChanged (state) {
      window.clearTimeout(state.middlePalleteTimeout)
      state.middlePalleteTimeout = setTimeout(() => {
        this.commit('autogenerateName')
      }, 300)
    },
    autogenerateName (state) {
      if (!state.palettes[0].customName) {
        const middleShade = state.palettes[0][500]
        let generatedName = colorNamer(`hsl(${middleShade.hue}, ${middleShade.saturation}%, ${middleShade.lightness}%)`, { pick: ['basic'] }).basic[0].name
        state.palettes[0].name = generatedName[0].toUpperCase() + generatedName.slice(1)
      }
    },
    exportToFile (state, { event, type }) {
      console.log(type)
      switch (type) {
        case 'figma':
          var svgFile = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">'
          var name = state.palettes[0].name
          Object.keys(state.palettes[0]).forEach((key, index) => {
            if (key === 'name') return
            const object = state.palettes[0][key]
            const RGB = HSLToRGB(object)
            svgFile += `<rect id="${name}/${key}" x="${100 * index}" y="0" width="100" height="100" fill="rgb(${RGB.red}, ${RGB.green}, ${RGB.blue})"/>`
          })
          svgFile += '</svg>'
          event.target.href = 'data:image/svg+xml;base64,' + btoa(svgFile)
          event.target.download = `${name}FigmaColorPalette.svg`
          break
        default:
          console.log('TEST')
      }
    }
  }
})
