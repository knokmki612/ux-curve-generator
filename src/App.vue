<template>
  <div id="app">
    <div class="max-w-xl mx-auto my-4 px-4">
      <h1 class="text-center text-4xl">
        {{ $t("title") }}
      </h1>
      <UxCurve class="mt-4" />
      <UxTimeline class="mt-4" />
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

<style lang="scss">
</style>
