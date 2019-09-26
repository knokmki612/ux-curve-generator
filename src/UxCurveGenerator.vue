<template>
  <article class="rounded shadow bg-white max-w-3xl p-2">
    <UxCurveTitle
      :subject="subject"
      readonly
    >
      <i18n
        tag="p"
        path="UxCurveTitle.advertisement"
        class="text-right mt-1"
      >
        <a
          slot="uxCurveGenerator"
          class="text-link"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
        >{{ $t('UxCurveTitle.uxCurveGenerator') }}</a>
      </i18n>
    </UxCurveTitle>
    <UxCurve
      class="sticky-outer mt-4"
      v-bind="props"
    />
    <UxTimelineView
      class="mt-4"
      v-bind="props"
    />
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import i18n from './i18n'
import UxCurveTitle from './components/UxCurveTitle.vue'
import UxCurve from './components/UxCurve.vue'
import UxTimelineView from './components/UxTimelineView.vue'

@Component({
  i18n,
  components: {
    UxCurveTitle,
    UxCurve,
    UxTimelineView
  }
})
export default class UxCurveGenerator extends Vue {
  @Prop(String) readonly ux!: string | undefined
  @Prop(String) readonly href!: string

  get deserializedData (): {
    subject: string,
    expectedUx: FixedUxEvent,
    uxEvents: Array<UxEvent>,
    actualUx: UxEvent
    } {
    const { ux } = this
    if (ux === undefined) {
      return {
        subject: '',
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

  get props (): {
    expectedUx: FixedUxEvent,
    uxEvents: Array<UxEvent>,
    actualUx: UxEvent
    } {
    const { expectedUx, uxEvents, actualUx } = this.deserializedData
    return { expectedUx, uxEvents, actualUx }
  }

  get subject (): string {
    const { subject } = this.deserializedData
    return subject
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

<style scoped lang="scss">
@media not all and (min-width: theme('screens.lg')) {
  @media (orientation: landscape) and (max-height: theme('screens.md')) {
    .sticky-outer {
      @apply relative inset-0 z-auto;
    }
  }
}
</style>
