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
import { mapState } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import ClipboardJS from 'clipboard'

@Component({
  computed: {
    ...mapState('ExpectedUx', ['expectedUx']),
    ...mapState('ActualUx', ['actualUx']),
    ...mapState('UxEvents', ['uxEvents'])
  }
})
export default class EmbedCode extends Vue {
  expectedUx!: FixedUxEvent
  actualUx!: UxEvent
  uxEvents!: Array<UxEvent>
  clipboard!: ClipboardJS

  get embedCode (): string {
    const { expectedUx, actualUx, uxEvents } = this
    return JSON.stringify({
      expectedUx,
      uxEvents,
      actualUx
    }, null, '  ')
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
