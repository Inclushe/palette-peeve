<template>
  <div :class="{'color': true, 'color--light': type === 'light' || hidden, 'color--dark': type === 'dark' && !hidden, selected }" :style="{background: hidden ? '#EEF0F6' : `hsl(${hue}deg, ${saturation}%, ${lightness}%)`}" @mousedown="setSelectedShade">
    <div class="color__inner">
      <div>
        <div v-if="hidden" class="indicator indicator--mini indicator--hidden" @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd">
          <img src="/public/images/icons/hide.svg" alt="Hide Icon">
        </div>
        <div v-else-if="contrastRatio >= 7" class="indicator indicator--mini" @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd" data-tooltip-info="Text on this color passes WCAG 2.0 level AAA for small text (≥ 7)." data-tooltip-keys="">
          <img :src="type === 'light' ? icons['doubleBlack'] : icons['doubleWhite']" alt="Double Check Icon">
        </div>
        <div v-else-if="contrastRatio < 7 && contrastRatio >= 4.5" class="indicator indicator--mini" @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd" data-tooltip-info="Text on this color passes WCAG 2.0 level AAA for large text (≥ 4.5)." data-tooltip-keys="">
          <img :src="type === 'light' ? icons['checkBlack'] : icons['checkWhite']" alt="Check Icon">
        </div>
        <div v-else-if="contrastRatio < 4.5 && contrastRatio >= 3" class="indicator indicator--warning" @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd" data-tooltip-info="Text on this color passes WCAG 2.0 level AA (≥ 3.0) but <b>fails</b> WCAG 2.0 level AAA (≥ 4.5)." data-tooltip-keys="">
          <img src="/public/images/icons/warning.svg" alt="Warning Icon">
          <p>{{contrastRatio}}</p>
        </div>
        <div v-else-if="contrastRatio < 3" class="indicator indicator--error" @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd" data-tooltip-info="Text on this color fails WCAG 2.0 level AA (≥ 3.0)." data-tooltip-keys="">
          <img src="/public/images/icons/error.svg" alt="Warning Icon">
          <p>{{contrastRatio}}</p>
        </div>
      </div>
      <div>
      <DraggableInput :index="index" :shade="shade" type="hue"></DraggableInput>
      <DraggableInput :index="index" :shade="shade" type="saturation"></DraggableInput>
      <DraggableInput :index="index" :shade="shade" type="lightness"></DraggableInput>
      </div>
    </div>
  </div>
</template>

<script>
import DraggableInput from './DraggableInput'
import { mapState, mapMutations } from 'vuex'
import getContrastRatio from './../scripts/helpers/getContrastRatio'
import icons from './../images/icons/*.svg'

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
  props: ['index', 'shade'],
  data () {
    return {
      icons,
      type: null
    }
  },
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
        return state.palettes[this.index][this.shade].hue
      },
      saturation (state) {
        return state.palettes[this.index][this.shade].saturation
      },
      lightness (state) {
        return state.palettes[this.index][this.shade].lightness
      },
      hidden (state) {
        return state.palettes[this.index][this.shade].hidden
      },
      selected (state) {
        return (!state.dragged && state.currentlySelectedShade && state.currentlySelectedShade.color === this.color && state.currentlySelectedShade.shade === this.shade)
      }
    })
  },
  methods: {
    setSelectedShade () {
      this.$store.commit('setSelectedShade', {
        index: this.index,
        shade: this.shade
      })
    },
    ...mapMutations(['hoverStart', 'hoverEnd'])
  },
  components: {
    DraggableInput
  },
  mounted () {
    this.type = Number(this.shade) <= 500 || this.hidden ? 'light' : 'dark'
  }
}
</script>

<style>
</style>