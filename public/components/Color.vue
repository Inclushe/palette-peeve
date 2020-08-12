<template>
  <div :class="{'color': true, selected }" :style="{background: `hsl(${hue}deg, ${saturation}%, ${lightness}%)`}" @mousedown="setSelectedShade">
    <div class="color__inner">
      <DraggableInput :name="name" :shade="shade" type="hue"></DraggableInput>
      <DraggableInput :name="name" :shade="shade" type="saturation"></DraggableInput>
      <DraggableInput :name="name" :shade="shade" type="lightness"></DraggableInput>
    </div>
  </div>
</template>

<script>
import DraggableInput from './DraggableInput'
import { mapState } from 'vuex'

export default {
  props: ['name', 'shade'],
  data () {
    return {
      hello: 3
    }
  },
  computed: mapState({
    hue (state) {
      return state.palettes[this.name][this.shade].hue
    },
    saturation (state) {
      return state.palettes[this.name][this.shade].saturation
    },
    lightness (state) {
      return state.palettes[this.name][this.shade].lightness
    },
    selected (state) {
      return (state.currentlySelectedShade && state.currentlySelectedShade.color === this.color && state.currentlySelectedShade.shade === this.shade)
    }
  }),
  methods: {
    setSelectedShade () {
      this.$store.commit('setSelectedShade', { name: this.name, shade: this.shade })
    }
  },
  components: {
    DraggableInput
  }
}
</script>

<style>
</style>