<template>
  <div id="app">
    <div class="max-w-4xl mx-auto my-4 px-4">
      <h1 class="text-center text-4xl">
        {{ $t("title") }}
      </h1>
      <div class="lg:flex lg:items-start lg:flex-row">
        <UxCurve class="sticky z-10 mt-4 lg:mr-4 lg:flex-1" />
        <UxTimeline class="mt-4 lg:max-w-xs" />
      </div>
    </div>
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

<style scoped lang="sass">
.ux-curve
  top: 1rem
</style>
