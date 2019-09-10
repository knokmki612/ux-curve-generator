<template>
  <span class="relative-date-input">
    <i18n
      tag="span"
      path="RelativeDateInput.path"
      class="inner"
    >
      <select
        v-if="prevUxEvent"
        slot="event"
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
        slot="event"
        class="whitespace-no-wrap"
      >{{ $t('RelativeDateInput.nextEvent') }}</span>
      <span
        v-show="isJumpForward"
        slot="eventAdverb"
      >{{ $t('RelativeDateInput.from') }}</span>
      <span
        v-show="!isJumpForward"
        slot="eventAdverb"
      >{{ $t('RelativeDateInput.since') }}</span>
      <span
        slot="duration"
        class="whitespace-no-wrap"
      >
        <input
          v-model="targetNumber"
          type="number"
          class="mr-2 form w-16"
        >
        <select
          v-model="targetUnit"
          class="form appearance-none text-center"
        >
          <option value="minute">{{ $tc('Relative.minute', targetNumber, { n: '' }) }}</option>
          <option value="hour">{{ $tc('Relative.hour', targetNumber, { n: '' }) }}</option>
          <option value="day">{{ $tc('Relative.day', targetNumber, { n: '' }) }}</option>
          <option value="month">{{ $tc('Relative.month', targetNumber, { n: '' }) }}</option>
          <option value="year">{{ $tc('Relative.year', targetNumber, { n: '' }) }}</option>
        </select>
      </span>
      <span
        v-show="isJumpForward"
        slot="durationAdverb"
        class="whitespace-no-wrap"
      >{{ $t('RelativeDateInput.after') }}</span>
      <span
        v-show="!isJumpForward"
        slot="durationAdverb"
        class="whitespace-no-wrap"
      >{{ $t('RelativeDateInput.ago') }}</span>
    </i18n>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UxEvent } from '@/types'
import {
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
  startOfDay,
  startOfMinute
} from 'date-fns'

@Component({
  computed: {
    ...mapState(['actualUx'])
  }
})
export default class RelativeDateInput extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  @Prop([Date, Object]) readonly value!: Date | object
  actualUx!: UxEvent
  targetJumpDirection: string = this.isUxEvent(this.prevUxEvent)
    ? 'forward'
    : 'backward'
  targetNumber: number = 1
  targetUnit: string = 'day'

  get isJumpForward (): boolean {
    const { targetJumpDirection } = this
    return targetJumpDirection === 'forward'
  }

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

  get targetDate (): Date {
    const { isJumpForward, isUxEvent, prevUxEvent, nextUxEvent, actualUx } = this
    return isJumpForward && isUxEvent(prevUxEvent)
      ? prevUxEvent.date
      : isUxEvent(nextUxEvent)
        ? nextUxEvent.date
        : actualUx.date
  }

  get newDate (): Date {
    const { isJumpForward, targetUnit, targetDate, targetNumber, jumpDate } = this
    const sign = isJumpForward ? 1 : -1
    let date = jumpDate(targetDate, targetNumber * sign)
    if (targetUnit !== 'minute' && targetUnit !== 'hour') {
      date = startOfDay(date)
    } else {
      date = startOfMinute(date)
    }
    return date
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

  isUxEvent (uxEvent: UxEvent | undefined): uxEvent is UxEvent {
    return uxEvent !== undefined
  }
}
</script>

<style scoped lang="sass">
.relative-date-input
  > .inner
    @apply -mt-2 inline-block

    > *
      @apply mt-2 inline-block
</style>
