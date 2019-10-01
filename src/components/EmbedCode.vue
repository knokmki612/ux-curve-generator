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
      :aria-label="$t('EmbedCode.label')"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import ClipboardJS from 'clipboard'

@Component({
  computed: {
    ...mapState('Duration', ['start', 'end'])
  },
  methods: {
    ...mapMutations('Duration', ['updateEnd'])
  }
})
export default class EmbedCode extends Vue {
  @Prop(String) readonly subject!: string
  @Prop(Object) readonly expectedUx!: FixedUxEvent
  @Prop(Object) readonly actualUx!: UxEvent
  @Prop(Array) readonly uxEvents!: Array<UxEvent>
  start!: string
  end!: string
  updateEnd!: () => void
  clipboard!: ClipboardJS

  get embedCode (): string {
    const { ux, duration, href, $i18n } = this
    // eslint-disable-next-line no-useless-escape
    return `<ux-curve-generator href="${href}" duration='${duration}' ux='${ux}'><\/ux-curve-generator><script src="https://unpkg.com/vue"><a href="${href}">${$i18n.t('UxCurveTitle.uxCurveGenerator')}</a><\/script><script src="https://unpkg.com/ux-curve-generator"><\/script>`
  }

  get ux (): string {
    const { subject, expectedUx, actualUx, uxEvents } = this
    return JSON.stringify({
      subject,
      expectedUx,
      uxEvents,
      actualUx
    })
  }

  get duration (): string {
    const { start, end } = this
    return JSON.stringify({
      start,
      end
    })
  }

  get href (): string {
    return `${location.origin}${location.pathname}`
  }

  mounted () {
    this.clipboard = new ClipboardJS('.copy-button')
  }

  @Watch('ux')
  onUxChanged (): void {
    this.updateEnd()
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
