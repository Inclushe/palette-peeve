<template>
  <div class="tooltip" id="tooltip" :style="style">
    <div class="tooltip--text" v-html="text"></div>
    <div class="tooltip--keyboard" v-html="keyboard"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      text (state) {
        return state.tooltip.text
      },
      style (state) {
        return state.tooltip.style
      },
      keyboard (state) {
        let keys = state.tooltip.keyboard || ''
        keys = keys.split(',')
        let keysHTML = ''
        if (state.tooltip.keyboard !== '') {
          keys.forEach((value, index) => {
            keysHTML += `<div class="tooltip--key">${value}</div>`
            if (index < keys.length - 1) {
              keysHTML += '<div>+</div>'
            }
          })
        }
        return keysHTML
      }
    })
  }
}
</script>

<style>

</style>