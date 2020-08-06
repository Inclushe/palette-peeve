<template>
  <div class="color" :style="{background: `hsl(${hue}deg, ${saturation}%, ${lightness}%)`}">
    <DraggableInput :name="name" :shade="shade" type="hue"></DraggableInput>
    <DraggableInput :name="name" :shade="shade" type="saturation"></DraggableInput>
    <DraggableInput :name="name" :shade="shade" type="lightness"></DraggableInput>
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
    }
  }),
  components: {
    DraggableInput
  }
}
</script>

<style>
</style>