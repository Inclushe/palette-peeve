<template>
  <input ref="input" v-if="selected" type="number" :min="min" :max="max" index="" id="" v-model.number="value" @mousedown="startDrag" @mouseup="endDrag" @touchstart="startDrag" @blur="unselect" :class="{dragged, warning: type === 'lightness' && value === 100, selected, input: true}">
  <div v-else @mousedown="startDrag" @mouseup="endDrag" @touchstart="startDrag" :class="{dragged, warning: type === 'lightness' && value === 100, selected, input: true}">{{value}}</div>
</template>

<script>
export default {
  props: ['index', 'shade', 'type'],
  data () {
    return {
      dragging: false,
      temp: null,
      mouseX: null,
      min: this.type === 'hue' ? -1 : 0,
      max: this.type === 'hue' ? 360 : 100,
      selected: false
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
      this.dragging = true
      this.temp = this.value
      this.mouseX = e.x
      document.body.addEventListener('mousemove', this.drag)
      document.body.addEventListener('mouseup', this.endDrag)
      document.body.addEventListener('mouseleave', this.endDrag)
      console.log(e)
    },
    endDrag (e) {
      if (this.dragging) {
        if (this.dragged === false) {
          if (!this.selected) {
            this.selected = true
          }
          this.$nextTick(() => {
            if (this.selected === true) {
              this.$refs.input.focus()
            }
          })
        }
        this.dragging = false
        this.dragged = false
        document.body.removeEventListener('mousemove', this.drag)
        document.body.removeEventListener('mouseup', this.endDrag)
        document.body.removeEventListener('mouseleave', this.endDrag)
        console.log(e)
        this.$store.commit('saveUndoState')
      }
    },
    unselect (e) {
      this.selected = false
    }
  },
  computed: {
    value: {
      get: function () {
        return this.$store.state.palettes[this.index][this.shade][this.type]
      },
      set: function (newValue) {
        let adjustedValue
        console.log(this.selected)
        if (this.type === 'hue') {
          if (this.selected) {
            adjustedValue = Math.max(0, Math.min(newValue, 360))
          } else {
            adjustedValue = (newValue) % this.max
            if (adjustedValue < 0) {
              adjustedValue = 360 + adjustedValue 
            }
          }
        } else {
          adjustedValue = Math.max(0, Math.min(newValue, 100))
        }
        this.$store.commit('setPalette', {
          index: this.index,
          shade: this.shade,
          type: this.type,
          value: adjustedValue
        })
        if (this.shade == 500) {
          this.$store.commit('middlePalleteChanged')
        }
      }
    },
    dragged: {
      get: function () {
        return this.$store.state.dragged
      },
      set: function (newValue) {
        this.$store.commit('setDragged', newValue)
      }
    }
  }
}
</script>

<style>

</style>