<template>
  <input type="number" :min="min" :max="max" name="" id="" v-model.number="value" @mousedown="startDrag" @mouseup="endDrag" @touchstart="startDrag" :class="{dragged, warning: type === 'lightness' && value === 100}">
</template>

<script>
export default {
  props: ['name', 'shade', 'type'],
  data () {
    return {
      dragged: false,
      temp: null,
      mouseX: null,
      min: this.type === 'hue' ? -1 : 0,
      max: this.type === 'hue' ? 360 : 100
    }
  },
  methods: {
    drag (e) {
      this.value = this.temp + Math.floor((e.x - this.mouseX) / 4)
      if (this.value !== this.temp) {
        this.disabled = true
        this.dragged = true
      }
    },
    startDrag (e) {
      this.temp = this.value
      this.mouseX = e.x
      document.body.addEventListener('mousemove', this.drag)
      document.body.addEventListener('mouseup', this.endDrag)
      document.body.addEventListener('mouseleave', this.endDrag)
      console.log(e)
    },
    endDrag (e) {
      this.dragged = false
      document.body.removeEventListener('mousemove', this.drag)
      document.body.removeEventListener('mouseup', this.endDrag)
      document.body.removeEventListener('mouseleave', this.endDrag)
      console.log(e)
      this.$store.commit('setUndoState')
    }
  },
  computed: {
    value: {
      get: function () {
        return this.$store.state.palettes[this.name][this.shade][this.type]
      },
      set: function (newValue) {
        let adjustedValue
        if (this.type === 'hue') {
          adjustedValue = (newValue) % this.max
          if (adjustedValue < 0) {
            adjustedValue = 360 + adjustedValue 
          }
        } else {
          adjustedValue = Math.max(0, Math.min(newValue, 100))
        }
        this.$store.commit('setPalette', {
          name: this.name,
          shade: this.shade,
          type: this.type,
          value: adjustedValue
        })
      }
    }
  }
}
</script>

<style>

</style>