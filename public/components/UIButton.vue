<template>
  <a @click="runAction($event); hoverEnd(hoverEnd); hoverStart($event);" :class="{button: true, 'button--disabled': disabled || activewhenselecting && currentlySelectedShade === null}" role="button" @mousedown="rippleStart" @mouseup="rippleEnd" v-on:click.stop @mouseover.stop="hoverStart" @mouseout.stop="hoverEnd" data-ripple="true" :data-action="action" :data-tooltip-info="name" :data-tooltip-keys="keyboardshortcut">
    <img :src="imageurl" :alt="name + ' Icon'">
    <span>{{ name }}</span>
  </a>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['action', 'name', 'keyboardshortcut', 'imageurl', 'activewhenselecting', 'disabled'],
  data () {
    return {}
  },
  computed: {
    ...mapState(['currentlySelectedShade'])
  },
  methods: {
    runAction (e) {
      this.$store.commit(this.action)
      if (this.action === 'paste' || this.action === 'toggleVisibility') {
        this.saveUndoState()
      }
    },
    ...mapMutations(['saveUndoState', 'hoverStart', 'hoverEnd', 'rippleStart', 'rippleEnd'])
  },
}
</script>

<style>

</style>