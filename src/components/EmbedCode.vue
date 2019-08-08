<template>
  <div class="embed-code">
    <span>{{ $t("embedCode") }}</span>
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
      {{ $t("copyToClipboard") }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import ClipboardJS from 'clipboard'

@Component({
  computed: {
    ...mapState(['expectedUx', 'actualUx', 'uxEvents'])
  }
})
export default class EmbedCode extends Vue {
  expectedUx!: FixedUxEvent
  actualUx!: FixedUxEvent
  uxEvents!: Array<UxEvent>
  clipboard!: ClipboardJS

  get embedCode (): string {
    const { expectedUx, actualUx, uxEvents } = this
    return JSON.stringify({
      expectedUx,
      actualUx,
      uxEvents
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

  > .code
    @apply w-full rounded shadow p-2
    &:focus
      @apply shadow-outline
</style>
