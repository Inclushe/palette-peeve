<template>
  <div class="sidebar">
    <header>
      <h1>Export</h1>
      <ui-button name="Hide Sidebar" action="hideSidebar" :imageurl="icons['close']" type="mini"></ui-button>
    </header>
    <div class="sidebar--contents">
      <SidebarSection action="export" exporttype="scss" id="scss">
        <template v-slot:title>SCSS</template>
        <template v-slot:description>
          <p>1. Click download.</p>
          <p>2. Copy and paste the code into your .scss file.</p>
        </template>
      </SidebarSection>
      <SidebarSection action="export" exporttype="figma" id="figma">
        <template v-slot:title>Figma</template>
        <template v-slot:description>
          <p>1. Download the file.</p>
          <p>2. Install the extension <a href="https://www.figma.com/community/plugin/739237058450529919/Chroma-Colors" target="_blank">Chroma Colors</a> from the Figma extension library.</p>
          <p>3. Drag or import the downloaded file into your Figma document.</p>
          <p>4. Select the color palettes, right-click, and click on Plugins > Chroma Colors.</p>
        </template>
      </SidebarSection>
      <SidebarSection action="export" exporttype="ase" id="ase">
        <template v-slot:title>Adobe .ase</template>
        <template v-slot:description>
          <p>1. Download the file.</p>
          <p>2. In Illustrator, from the Swatches window, click on the Swatches Library menu dropdown button, click Other Library..., and find the downloaded file.</p>
        </template>
      </SidebarSection>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import UIButton from './UIButton'
import SidebarSection from './SidebarSection'
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
    'ui-button': UIButton,
    SidebarSection
  }
}
</script>

<style>

</style>