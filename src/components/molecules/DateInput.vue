<template>
  <div class="date-input">
    <BaseTab
      v-model="inputType"
      :tab-items="['相対', '絶対']"
    />
    <div
      v-if="inputType === 0"
      class="input"
    >
      <label
        v-if="prevUxEvent"
        class="flex"
      >
        <input
          type="radio"
          name="relativeDate"
          class="align-middle"
        >
        <RelativeDateInput
          v-model="newDate"
          is-forward-time-jump
          :reference-date="prevUxEvent.date"
          class="ml-2 leading-normal"
        />
      </label>
      <label class="flex mt-2">
        <input
          type="radio"
          name="relativeDate"
          class="align-middle"
        >
        <RelativeDateInput
          v-model="newDate"
          :reference-date="nextUxEventDate"
          class="ml-2 leading-normal"
        />
      </label>
    </div>
    <AbsoluteDateInput
      v-if="inputType === 1"
      v-model="newDate"
      class="input block leading-normal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import BaseTab from 'atoms/BaseTab.vue'
import AbsoluteDateInput from 'atoms/AbsoluteDateInput.vue'
import RelativeDateInput from 'atoms/RelativeDateInput.vue'

@Component({
  components: {
    BaseTab,
    AbsoluteDateInput,
    RelativeDateInput
  }
})
export default class DateInput extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  @Prop([Date, Object]) readonly value!: Date | object
  inputType: number = 0

  get nextUxEventDate (): Date {
    const { nextUxEvent } = this
    return typeof nextUxEvent === 'undefined'
      ? new Date()
      : nextUxEvent.date
  }

  get newDate (): Date {
    return this.value as Date
  }

  set newDate (value: Date) {
    this.input(value)
  }

  @Emit()
  input (value: Date): Date {
    return value
  }
}
</script>

<style scoped lang="sass">
.date-input
  > * ~ *
    @apply mt-2

  > .input
    min-height: 2.5rem
</style>
