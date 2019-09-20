<template>
  <section class="embed-code">
    <h3 class="header">
      {{ $t('EmbedCode.title') }}
    </h3>
    <textarea
      class="code"
      readonly
      rows="10"
      :value="embedCode"
    />
    <button
      type="button"
      class="copy-button button -blue"
      data-clipboard-target=".code"
    >
      {{ $t('EmbedCode.copyToClipboard') }}
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import ClipboardJS from 'clipboard'

@Component
export default class EmbedCode extends Vue {
  @Prop(Object) readonly expectedUx!: FixedUxEvent
  @Prop(Object) readonly actualUx!: UxEvent
  @Prop(Array) readonly uxEvents!: Array<UxEvent>
  clipboard!: ClipboardJS

  get embedCode (): string {
    const { ux } = this
    // eslint-disable-next-line no-useless-escape
    return `<ux-curve-generator ux='${ux}'><\/ux-curve-generator><script src="https://unpkg.com/vue"><\/script><script src="https://unpkg.com/ux-curve-generator"><\/script>`
  }

  get ux (): string {
    const { expectedUx, actualUx, uxEvents } = this
    return JSON.stringify({
      expectedUx,
      uxEvents,
      actualUx
    })
  }

  mounted () {
    this.clipboard = new ClipboardJS('.copy-button')
  }
}
</script>

<style scoped lang="sass">
.embed-code
  @apply rounded shadow-md px-6 py-4 bg-gray-300

  > * ~ *
    @apply mt-2

  > .header
    @apply font-bold text-lg

    & + *:not(.header)
      @apply mt-4

    &.-small
      @apply font-normal text-sm

      & + *:not(.header)
        @apply mt-1

  > .code
    @apply w-full rounded shadow p-2
    &:focus
      @apply shadow-outline
</style>
