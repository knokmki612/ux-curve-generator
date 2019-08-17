<template>
  <div id="app">
    <article class="max-w-3xl lg:max-w-8xl mx-auto my-4 px-4">
      <h1 class="text-center text-4xl">
        {{ $t("title") }}
      </h1>
      <div class="lg:flex lg:items-start lg:flex-row">
        <div class="sticky-outer mt-4 lg:mr-4 lg:flex-1">
          <UxCurve />
        </div>
        <UxTimeline class="mt-4 w-full lg:max-w-xs xl:max-w-sm" />
      </div>
      <EmbedCode class="mt-4" />
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UxCurve from './components/UxCurve.vue'
import UxTimeline from './components/UxTimeline.vue'
import EmbedCode from './components/EmbedCode.vue'

@Component({
  components: {
    UxCurve,
    UxTimeline,
    EmbedCode
  }
})
export default class App extends Vue {}
</script>

<style scoped lang="sass">
.sticky-outer
  @apply sticky z-10
  top: 1rem
</style>

<style scoped lang="scss">
@media not all and (min-width: theme('screens.lg')) {
  @media (orientation: landscape) and (max-height: theme('screens.md')) {
    .sticky-outer {
      @apply relative inset-0 z-auto;
    }
  }
}
</style>
