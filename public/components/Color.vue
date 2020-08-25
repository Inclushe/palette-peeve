<template>
  <div :class="{'color': true, 'color--light': Number(shade) <= 500, 'color--dark': Number(shade) > 500, selected }" :style="{background: hidden ? 'transparent' : `hsl(${hue}deg, ${saturation}%, ${lightness}%)`}" @mousedown="setSelectedShade">
    <div class="color__inner">
      <div>
        <div v-if="contrastRatio < 4.5 && contrastRatio >= 3" class="contrast-indicator contrast-indicator--warning">
          <img src="/public/images/icons/Warning.svg" alt="Warning Icon">
          <p>{{contrastRatio}}</p>
        </div>
        <div v-if="contrastRatio < 3" class="contrast-indicator contrast-indicator--error">
          <img src="/public/images/icons/Error.svg" alt="Warning Icon">
          <p>{{contrastRatio}}</p>
        </div>
      </div>
      <div>
      <DraggableInput :name="name" :shade="shade" type="hue"></DraggableInput>
      <DraggableInput :name="name" :shade="shade" type="saturation"></DraggableInput>
      <DraggableInput :name="name" :shade="shade" type="lightness"></DraggableInput>
      </div>
    </div>
  </div>
</template>

<script>
import DraggableInput from './DraggableInput'
import { mapState } from 'vuex'
import getContrastRatio from './../scripts/helpers/getContrastRatio'

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
  computed: {
    contrastRatio () {
      // @TODO: Might be too demanding
      const onColor = Number(this.shade) <= 500 ? black : white
      return (Math.floor(getContrastRatio({
        hue: this.hue,
        saturation: this.saturation,
        lightness: this.lightness
      }, onColor)*10)/10).toFixed(1)
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
    }
  },
  components: {
    DraggableInput
  }
}
</script>

<style>
</style>