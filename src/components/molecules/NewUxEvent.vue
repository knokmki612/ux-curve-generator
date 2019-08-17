<template>
  <section class="new-ux-event">
    <h3 class="header">
      {{ $t('newEvent') }}
    </h3>
    <h4 class="header -small">
      {{ $t('date') }}
    </h4>
    <div
      v-if="prevUxEvent"
      class="flex"
    >
      <input
        type="radio"
        name="relativeDate"
        class="align-middle"
      >
      <RelativeDateInput
        is-prev
        class="ml-2"
        :date="prevUxEvent.date"
      />
    </div>
    <div class="flex">
      <input
        type="radio"
        name="relativeDate"
        class="align-middle"
      >
      <RelativeDateInput
        class="ml-2"
        :date="nextUxEventDate"
      />
    </div>
    <div class="flex">
      <input
        type="radio"
        name="relativeDate"
        class="align-middle"
      >
      <span class="ml-2 leading-normal">
        直接入力
        <AbsoluteDateInput
          v-model="newUxEvent.date"
        />
      </span>
    </div>
    <h4 class="header -small">
      {{ $t('score') }}
    </h4>
    <input
      v-model="newUxEvent.score"
      type="number"
      min="-100"
      max="100"
      class="form -score"
    >
    <h4 class="header -small">
      {{ $t('description') }}
    </h4>
    <textarea
      v-model="newUxEvent.description"
      class="form -description"
    />
    <button
      type="button"
      class="button -blue"
      :disabled="!isNewUxEventReady"
      @click="finish"
    >
      {{ $t('create') }}
    </button>
    <button
      type="button"
      class="button -red"
      @click="$emit('finish')"
    >
      {{ $t('cancel') }}
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import AbsoluteDateInput from 'atoms/AbsoluteDateInput.vue'
import RelativeDateInput from 'atoms/RelativeDateInput.vue'
import { isValid } from 'date-fns'

@Component({
  components: {
    AbsoluteDateInput,
    RelativeDateInput
  },
  methods: {
    ...mapMutations(['addUxEvent'])
  }
})
export default class NewUxEvent extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  newUxEvent: UxEvent = this.createUxEvent()
  private addUxEvent!: (payload: UxEvent) => void

  get nextUxEventDate (): Date {
    const { nextUxEvent } = this
    return typeof nextUxEvent === 'undefined'
      ? new Date()
      : nextUxEvent.date
  }

  get isNewUxEventReady (): boolean {
    return this.newUxEvent.date instanceof Date && isValid(this.newUxEvent.date)
  }

  createUxEvent (): UxEvent {
    return { date: {} as Date, score: 0, description: '' }
  }

  @Emit()
  finish (): void {
    this.addUxEvent(this.newUxEvent)
    this.newUxEvent = this.createUxEvent()
  }
}
</script>

<style scoped lang="sass">
.new-ux-event
  @apply rounded-r shadow-md px-6 py-4 bg-gray-300

  > * ~ *
    @apply mt-2

  > * + .header
    @apply mt-4

  > .header + *:not(.header)
    @apply mt-1

  > .header
    @apply font-bold text-lg

    &.-small
      @apply font-normal text-sm

  > .form
    @apply block rounded shadow p-2
    &:focus
      @apply shadow-outline

    &.-description
      @apply w-full

  > .button
    @apply inline-block mr-2

    &:last-child
      @apply mr-0
</style>
