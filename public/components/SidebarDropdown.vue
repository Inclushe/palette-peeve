<template>
  <div class="option option--expanded">
    <header class="option__header">
      <div class="option__name">
        <h2><slot name="title"></slot></h2>
      </div>
      <div class="option__actions">
        <ui-button name="Download" :action="action" :exporttype="exporttype" :imageurl="icons['download']" type="mini"></ui-button>
        <ui-button name="Info" :imageurl="icons['info']" type="mini" action="emit" message="toggleExpand" v-on:toggleExpand="toggleExpand"></ui-button>
      </div>
    </header>
    <div class="option__info" v-if="expanded">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import UIButton from './UIButton'
import icons from './../images/icons/*.svg'
export default {
  props: ['action', 'exporttype'],
  data () {
    return {
      icons,
      message: "",
      expanded: false
    }
  },
  methods: {
    toggleExpand () {
      this.expanded = !this.expanded
      console.log(this.expanded)
    }
  },
  watch: {
    message (newMessage) {
      this[newMessage]()
    }
  },
  components: {
    'ui-button': UIButton
  }
}
</script>

<style>

</style>