<template>
  <div class="ux-curve-title text-center">
    <i18n
      path="UxCurveTitle.title"
      tag="h2"
      class="leading-normal"
    >
      <p
        v-if="readonly"
        slot="subject"
        class="inline-block form text-xl"
      >
        {{ subject }}
      </p>
      <input
        v-else
        slot="subject"
        :aria-label="$t('UxCurveTitle.subjectLabel')"
        class="form max-w-full lg:w-1/2 text-xl text-center"
        :value="subject"
        @input="updateSubject($event.target.value)"
      >
      <span
        slot="uxCurve"
        class="whitespace-no-wrap"
      >{{ $t('UxCurveTitle.uxCurve') }}</span>
    </i18n>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mapMutations } from 'vuex'

@Component({
  methods: {
    ...mapMutations('Subject', ['updateSubject'])
  }
})
export default class UxCurveTitle extends Vue {
  @Prop(Boolean) readonly readonly!: boolean
  @Prop(String) readonly subject!: string
}
</script>

<style scoped lang="sass">
.ux-curve-title
  @apply rounded shadow-md px-6 py-4 bg-gray-300
</style>
