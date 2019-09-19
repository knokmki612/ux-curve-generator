<template>
  <div id="app">
    <article class="max-w-3xl lg:max-w-8xl mx-auto my-4 px-4">
      <i18n
        tag="h1"
        path="App.title"
        class="text-center text-4xl"
      >
        <span
          slot="uxCurve"
        >{{ $t('App.uxCurve') }}</span>
        <span
          slot="generator"
          class="whitespace-no-wrap"
        >{{ $t('App.generator') }}</span>
      </i18n>
      <div class="lg:flex lg:items-start lg:flex-row">
        <div class="sticky-outer mt-4 lg:mr-4 lg:flex-1">
          <UxCurve v-bind="props" />
        </div>
        <UxTimeline
          class="mt-4 w-full lg:max-w-xs xl:max-w-sm"
          v-bind="props"
        />
      </div>
      <EmbedCode
        class="mt-4"
        v-bind="props"
      />
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import UxCurve from './components/UxCurve.vue'
import UxTimeline from './components/UxTimeline.vue'
import EmbedCode from './components/EmbedCode.vue'

@Component({
  components: {
    UxCurve,
    UxTimeline,
    EmbedCode
  },
  computed: {
    ...mapState('ExpectedUx', ['expectedUx']),
    ...mapState('ActualUx', ['actualUx']),
    ...mapState('UxEvents', ['uxEvents'])
  }
})
export default class App extends Vue {
  readonly expectedUx!: FixedUxEvent
  readonly actualUx!: UxEvent
  readonly uxEvents!: Array<UxEvent>

  get props (): object {
    const { expectedUx, uxEvents, actualUx } = this
    return {
      expectedUx,
      uxEvents,
      actualUx
    }
  }
}
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
