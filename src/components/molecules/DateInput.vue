<template>
  <div class="date-input">
    <BaseTab
      v-model="inputType"
      :tab-items="[$t('DateInput.relative'), $t('DateInput.absolute')]"
    />
    <RelativeDateInput
      v-show="inputType === 0"
      v-model="newDate"
      v-bind="relativeDateInputProps"
    >
      <select
        v-if="prevUxEvent"
        v-model="targetJumpDirection"
        class="form appearance-none"
      >
        <option value="forward">
          {{ $t('RelativeDateInput.previousEvent') }}
        </option>
        <option value="backward">
          {{ $t('RelativeDateInput.nextEvent') }}
        </option>
      </select>
      <span
        v-else
        class="whitespace-no-wrap"
      >{{ $t('RelativeDateInput.nextEvent') }}</span>
    </RelativeDateInput>
    <AbsoluteDateInput
      v-show="inputType === 1"
      v-model="newDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
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
  targetJumpDirection: string = this.prevUxEvent === undefined
    ? 'backward'
    : 'forward'
  absoluteDate: Date = this.value
  relativeDate: Date = this.value

  get isJumpForward (): boolean {
    const { targetJumpDirection } = this
    return targetJumpDirection === 'forward'
  }

  get relativeDateInputProps (): object {
    const { isJumpForward, isUxEvent, prevUxEvent, nextUxEvent } = this
    return {
      isJumpForward,
      targetDate: isJumpForward && isUxEvent(prevUxEvent)
        ? prevUxEvent.date
        : isUxEvent(nextUxEvent)
          ? nextUxEvent.date
          : new Date()
    }
  }

  get newDate (): Date {
    return this.value as Date
  }

  set newDate (value: Date) {
    this.input(value)
  }

  @Watch('inputType')
  onTabChanged (inputType: number): void {
    if (inputType === 0) {
      this.absoluteDate = this.newDate
      this.newDate = this.relativeDate
    }
    if (inputType === 1) {
      this.relativeDate = this.newDate
      this.newDate = this.absoluteDate
    }
  }

  @Emit()
  input (value: Date): Date {
    return value
  }

  isUxEvent (uxEvent: UxEvent | undefined): uxEvent is UxEvent {
    return uxEvent !== undefined
  }
}
</script>

<style scoped lang="sass">
.relative-date-input,
.absolute-date-input
  @apply mt-2 block

  min-height: 3rem
</style>
