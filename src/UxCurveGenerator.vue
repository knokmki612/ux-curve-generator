<template>
  <div id="app">
    <article class="rounded shadow bg-white max-w-3xl mx-auto p-4">
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
      <UxCurve
        class="sticky-outer mt-4"
        v-bind="props"
      />
      <UxTimelineView
        class="mt-4"
        v-bind="props"
      />
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import i18n from './i18n'
import UxCurve from './components/UxCurve.vue'
import UxTimelineView from './components/UxTimelineView.vue'

@Component({
  i18n,
  components: {
    UxCurve,
    UxTimelineView
  }
})
export default class UxCurveGenerator extends Vue {
  @Prop(String) readonly ux!: string | undefined

  get props (): { expectedUx: FixedUxEvent, uxEvents: Array<UxEvent>, actualUx: UxEvent } {
    const { ux } = this
    if (ux === undefined) {
      return {
        expectedUx: {
          score: 0,
          description: ''
        },
        uxEvents: [],
        actualUx: {
          score: 0,
          description: '',
          date: new Date().toISOString()
        }
      }
    }
    return JSON.parse(ux)
  }
}
</script>

<style lang="sass">
@import "./assets/tailwind"
</style>

<style scoped lang="sass">
.sticky-outer
  @apply sticky z-10
  top: theme('width.4')
</style>
