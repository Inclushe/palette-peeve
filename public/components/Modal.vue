<template>
  <div class="overlay" v-if="!hidden">
    <div class="modal modal--popup">
      <header>
        <h1 v-if="title">{{title}}</h1>
        <ui-button name="Hide Modal" :imageurl="icons['close']" type="mini" action="emit" message="hideModal" v-on:hideModal="hideModal"></ui-button>
      </header>
      <p v-if="description" v-html="description"></p>
      <textarea v-if="code" class="code-textarea" id="codeBlock" :value="code"></textarea>
      <footer>
        <div class="modal-button-container">
          <a href="#" class="modal-button modal-button--secondary" role="button" data-clipboard-target="#codeBlock" id="clipboardButton" v-if="hasSecondaryButton">
            <img :src="icons['copy']">
            Copy to Clipboard
          </a>
          <a href="#" class="modal-button modal-button--primary" role="button" @click="hideModal">Got It</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
const ClipboardJS = require('clipboard')
import icons from './../images/icons/*.svg'
import UIButton from './UIButton'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      clipboardContext: new ClipboardJS('#clipboardButton'),
      icons
    }
  },
  computed: {
    ...mapState({
      hidden (state) {
        return state.modal.hidden
      },
      code (state) {
        return state.modal.code
      },
      title (state) {
        return state.modal.title
      },
      description (state) {
        return state.modal.description
      },
      description (state) {
        return state.modal.description
      },
      hasSecondaryButton (state) {
        return state.modal.hasSecondaryButton
      },

    })
  },
  methods: {
    ...mapMutations({
      hideModal (commit, payload) {
        return commit('hideModal')
      },
      showModal (commit, payload) {
        return commit('showModal')
      },
    })
  },
  components: {
    'ui-button': UIButton
  }
}
</script>

<style>

</style>