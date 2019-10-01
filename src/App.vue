<template>
  <div id="app">
    <article class="max-w-3xl lg:max-w-8xl mx-auto my-2 px-2">
      <i18n
        tag="h1"
        path="App.title"
        class="text-center text-4xl"
      >
        <span
          slot="generator"
          class="whitespace-no-wrap"
        >{{ $t('App.generator') }}</span>
      </i18n>
      <p class="mt-1 text-center">
        <a
          class="text-link"
          :href="$t('App.howToUseLink')"
        >{{ $t('App.howToUse') }}</a>
      </p>
      <UxCurveTitle
        class="mt-4"
        :subject="subject"
      />
      <div class="lg:flex lg:items-start lg:flex-row">
        <div class="sticky-outer mt-4 lg:mr-4 lg:flex-1">
          <UxCurve
            has-link
            v-bind="props"
          />
        </div>
        <UxTimelineInput
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
import UxCurveTitle from './components/UxCurveTitle.vue'
import UxCurve from './components/UxCurve.vue'
import UxTimelineInput from './components/UxTimelineInput.vue'
import EmbedCode from './components/EmbedCode.vue'

@Component({
  components: {
    UxCurveTitle,
    UxCurve,
    UxTimelineInput,
    EmbedCode
  },
  computed: {
    ...mapState('Subject', ['subject']),
    ...mapState('ExpectedUx', ['expectedUx']),
    ...mapState('ActualUx', ['actualUx']),
    ...mapState('UxEvents', ['uxEvents'])
  }
})
export default class App extends Vue {
  readonly subject!: string
  readonly expectedUx!: FixedUxEvent
  readonly actualUx!: UxEvent
  readonly uxEvents!: Array<UxEvent>

  get props (): object {
    const { subject, expectedUx, uxEvents, actualUx } = this
    return {
      subject,
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
