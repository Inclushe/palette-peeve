<template>
  <div class="ripple" id="ripple" :style="style"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  state () {
    return {}
  },
  computed: {
    ...mapState({
      style (state) {
        return state.ripple.style
      },
    })
  }
}
</script>

<style>

</style>