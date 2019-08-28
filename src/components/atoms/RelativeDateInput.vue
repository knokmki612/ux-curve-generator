<template>
  <span class="relative-date-input">
    <slot />
    <span v-show="isJumpForward"> から </span>
    <span v-show="!isJumpForward"> より </span>
    <span class="whitespace-no-wrap">
      <input
        v-model="targetNumber"
        type="number"
        class="form w-16"
      >
      <select
        v-model="targetUnit"
        class="ml-2 form appearance-none text-center"
      >
        <option value="minute">{{ $tc('minute', targetNumber, { n: '' }) }}</option>
        <option value="hour">{{ $tc('hour', targetNumber, { n: '' }) }}</option>
        <option value="day">{{ $tc('day', targetNumber, { n: '' }) }}</option>
        <option value="month">{{ $tc('month', targetNumber, { n: '' }) }}</option>
        <option value="year">{{ $tc('year', targetNumber, { n: '' }) }}</option>
      </select>
      <span v-show="isJumpForward"> 後</span>
      <span v-show="!isJumpForward"> 前</span>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import {
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears
} from 'date-fns'

@Component
export default class RelativeDateInput extends Vue {
  @Prop(Boolean) readonly isJumpForward!: boolean
  @Prop(Object) readonly targetDate!: Date
  @Prop([Date, Object]) readonly value!: Date | object
  targetNumber: number = 1
  targetUnit: string = 'day'

  get jumpDate (): (date: Date, amount: number) => Date {
    const { targetUnit } = this
    switch (targetUnit) {
      case 'minute': return addMinutes
      case 'hour': return addHours
      case 'day': return addDays
      case 'month': return addMonths
      case 'year': return addYears
      default: return addDays
    }
  }

  get newDate (): Date {
    const { isJumpForward, targetDate, targetNumber } = this
    const sign = isJumpForward ? 1 : -1
    return this.jumpDate(targetDate, targetNumber * sign)
  }

  mounted () {
    this.input(this.newDate)
  }

  @Watch('newDate')
  onNewDateUpdated (value: Date): void {
    this.input(value)
  }

  @Emit()
  input (value: Date): Date {
    return value
  }
}
</script>

<style scoped lang="sass">
</style>
