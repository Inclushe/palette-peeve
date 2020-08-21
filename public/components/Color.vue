<template>
  <div :class="{'color': true, 'color--light': Number(shade) <= 500, 'color--dark': Number(shade) > 500, selected }" :style="{background: hidden ? 'transparent' : `hsl(${hue}deg, ${saturation}%, ${lightness}%)`}" @mousedown="setSelectedShade">
    <div class="color__inner">
      <h6>{{contrastRatio}}</h6>
      <DraggableInput :name="name" :shade="shade" type="hue"></DraggableInput>
      <DraggableInput :name="name" :shade="shade" type="saturation"></DraggableInput>
      <DraggableInput :name="name" :shade="shade" type="lightness"></DraggableInput>
    </div>
  </div>
</template>

<script>
import DraggableInput from './DraggableInput'
import { mapState } from 'vuex'

const black = {
  hue: 0,
  saturation: 0,
  lightness: 0
}

const white = {
  hue: 0,
  saturation: 0,
  lightness: 100
}

export default {
  props: ['name', 'shade'],
  data () {
    return {
      hello: 3
    }
  },
  computed: {
    contrastRatio () {
      // @TODO: Might be too demanding
      return (Math.floor(this._getContrastRatio({
        hue: this.hue,
        saturation: this.saturation,
        lightness: this.lightness
      }, black)*100)/100).toFixed(2)
    },
    ...mapState({
      hue (state) {
        return state.palettes[this.name][this.shade].hue
      },
      saturation (state) {
        return state.palettes[this.name][this.shade].saturation
      },
      lightness (state) {
        return state.palettes[this.name][this.shade].lightness
      },
      hidden (state) {
        return state.palettes[this.name][this.shade].hidden
      },
      selected (state) {
        return (!state.dragged && state.currentlySelectedShade && state.currentlySelectedShade.color === this.color && state.currentlySelectedShade.shade === this.shade)
      }
    })
  },
  methods: {
    setSelectedShade () {
      this.$store.commit('setSelectedShade', {
        name: this.name,
        shade: this.shade
      })
    },
    // Original code by Jon Kantner: https://css-tricks.com/converting-color-spaces-in-javascript/
    _HSLToRGB(hslObject) {
      let h = hslObject.hue
      let s = hslObject.saturation
      let l = hslObject.lightness
      
      // Must be fractions of 1
      s /= 100;
      l /= 100;

      let c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs((h / 60) % 2 - 1)),
          m = l - c/2,
          r = 0,
          g = 0,
          b = 0;

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return {
        red: r,
        green: g,
        blue: b
      }
    },
    _relativeLuminanceFromRGB ({red, green, blue}) {
      red /= 255
      green /= 255
      blue /= 255
      red = (red <= 0.03928) ? red / 12.92 : Math.pow(((red + 0.055) / 1.055), 2.4)
      green = (green <= 0.03928) ? green / 12.92 : Math.pow(((green + 0.055) / 1.055), 2.4)
      blue = (blue <= 0.03928) ? blue / 12.92 : Math.pow(((blue + 0.055) / 1.055), 2.4)
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue
    },
    _getContrastRatio (firstColor, secondColor) {
      const firstColorLuminance = this._relativeLuminanceFromRGB(this._HSLToRGB(firstColor))
      const secondColorLuminance = this._relativeLuminanceFromRGB(this._HSLToRGB(secondColor))
      if (firstColorLuminance > secondColorLuminance) {
        return (firstColorLuminance + 0.05) / (secondColorLuminance + 0.05)
      } else {
        return (secondColorLuminance + 0.05) / (firstColorLuminance + 0.05)
      }
    }
  },
  components: {
    DraggableInput
  }
}
</script>

<style>
</style>