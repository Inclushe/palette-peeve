<template>
  <div class="sidebar">
    <header>
      <h1>Export</h1>
      <ui-button name="Hide Sidebar" action="hideSidebar" :imageurl="icons['close']" type="mini"></ui-button>
    </header>
    <div class="sidebar--contents">
      <div class="option option--expanded">
        <header class="option__header">
          <div class="option__name">
            <h2>Figma</h2>
          </div>
          <div class="option__actions">
            <ui-button name="Download" action="export" exporttype="figma" :imageurl="icons['download']" type="mini"></ui-button>
            <ui-button name="Info" disabled="true" exporttype="figma" :imageurl="icons['info']" type="mini"></ui-button>
          </div>
        </header>
        <div class="option__info">
          <p>1. Download the file.</p>
          <p>2. Install the extension <a href="https://www.figma.com/community/plugin/739237058450529919/Chroma-Colors">Chroma Colors</a> from the Figma extension library.</p>
          <p>3. Drag or import the downloaded file into your Figma document.</p>
          <p>4. Select the color palettes, right-click, and click on Plugins > Chroma Colors.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import UIButton from './UIButton'
import icons from './../images/icons/*.svg'

export default {
  data () {
    return {
      icons
    }
  },
  methods: {
    click () {
      console.log('test')
    }
  },
  components: {
    'ui-button': UIButton
  }
}
</script>

<style>

</style>