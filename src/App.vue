<template>
  <div id="app">
    <UxCurve />
    <UxTimeline />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UxCurve from './components/UxCurve.vue'
import UxTimeline from './components/UxTimeline.vue'

@Component({
  components: {
    UxCurve,
    UxTimeline
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
