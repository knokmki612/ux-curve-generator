<template>
  <div id="app">
    <div class="max-w-lg lg:max-w-4xl mx-auto my-4 px-4">
      <h1 class="text-center text-4xl">
        {{ $t("title") }}
      </h1>
      <div class="lg:flex lg:items-start lg:flex-row">
        <div class="sticky-outer mt-4 lg:mr-4 lg:flex-1">
          <UxCurve />
          <EmbedCode
            v-if="isScreenLarge"
            class="mt-4"
          />
        </div>
        <EmbedCode
          v-if="!isScreenLarge"
          class="mt-4"
        />
        <UxTimeline class="mt-4 lg:max-w-xs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UxCurve from './components/UxCurve.vue'
import UxTimeline from './components/UxTimeline.vue'
import EmbedCode from './components/EmbedCode.vue'
import { screens } from '../tailwind.config'

@Component({
  components: {
    UxCurve,
    UxTimeline,
    EmbedCode
  }
})
export default class App extends Vue {
  screenLarge = window.matchMedia(`(min-width: ${screens.lg})`)
  isScreenLarge: boolean = this.screenLarge.matches

  mounted () {
    this.screenLarge.addListener(this.updateIsScreenLarge)
  }

  destroyed () {
    this.screenLarge.removeListener(this.updateIsScreenLarge)
  }

  updateIsScreenLarge (mediaQuery: any): void {
    this.isScreenLarge = mediaQuery.matches
  }
}
</script>

<style scoped lang="sass">
.sticky-outer
  @apply sticky z-10
  top: 1rem
</style>

<style scoped lang="scss">
@media not all and (min-width: config('screens.lg')) {
  @media (orientation: landscape) and (max-height: config('screens.md')) {
    .sticky-outer {
      @apply relative pin-none z-auto;
    }
  }
}
</style>
