<template>
  <a @click="runAction($event)" :class="{button: true, 'button--disabled': disabled || activewhenselecting && currentlySelectedShade === null, 'button--mini': type === 'mini'}" role="button" @mousedown="rippleStart" @mouseup="rippleEnd" v-on:click.stop @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd" data-ripple="true" :data-action="action" :data-tooltip-info="name" :data-tooltip-keys="keyboardshortcut">
    <img :src="imageurl" :alt="name + ' Icon'">
    <span>{{ name }}</span>
  </a>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['action', 'name', 'keyboardshortcut', 'imageurl', 'activewhenselecting', 'disabled', 'type', 'exporttype'],
  data () {
    return {}
  },
  computed: {
    ...mapState(['currentlySelectedShade'])
  },
  methods: {
    runAction (e) {
      if (this.action) {
        if (this.action === 'export') {
          this.$store.commit('exportToFile', {event: e, type: this.exporttype})
        } else {
          this.$store.commit(this.action)
          if (this.action === 'paste' || this.action === 'toggleVisibility') {
            this.saveUndoState()
          }
        }
      }
    },
    ...mapMutations(['saveUndoState', 'hoverStart', 'hoverEnd', 'rippleStart', 'rippleEnd'])
  },
  destroyed () {
    this.$store.commit('hoverEnd')
  }
}
</script>

<style>

</style>