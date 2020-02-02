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
        class="form appearance-none text-center"
      >
        <option value="forward">
          {{ $t('RelativeDateInput.previousEvent') }}
        </option>
        <option value="backward">
          {{ nextEventString }}
        </option>
      </select>
      <span
        v-else
        slot="event"
        class="whitespace-no-wrap"
      >{{ nextEventString }}</span>
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
          :max="maxTargetNumber"
          :aria-label="$t('RelativeDateInput.targetNumberLabel')"
          class="mr-2 form w-16"
        >
        <select
          v-model="targetUnit"
          class="form appearance-none text-center"
        >
          <option
            v-for="unit in availableUnits"
            :key="unit.key"
            :value="unit"
          >{{ $tc(`Relative.${unit.key}`, targetNumber, { n: '' }) }}</option>
        </select>
      </span>
      <span
        v-show="isJumpForward"
        slot="durationAdverb"
        class="whitespace-no-wrap"
      >{{ $t('RelativeDateInput.later') }}</span>
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
import { mapState, mapMutations } from 'vuex'
import { TranslateResult } from 'vue-i18n'
import { UxEvent } from '@/types'
import {
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isAfter,
  isValid,
  startOfMinute,
  startOfDay
} from 'date-fns'

type Unit = {
  key: string
  add: (date: Date, amount: number) => Date
  diff: (dateLeft: Date, dateRight: Date) => number
}

@Component({
  computed: {
    ...mapState('ActualUx', ['actualUx']),
    ...mapState('LastChosenUnitKey', ['lastChosenUnitKey'])
  },
  methods: {
    ...mapMutations('LastChosenUnitKey', ['updateUnitKey'])
  }
})
export default class RelativeDateInput extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  @Prop(String) readonly value!: string
  readonly actualUx!: UxEvent
  readonly lastChosenUnitKey!: string
  updateUnitKey!: (payload: string) => void
  targetJumpDirection: string = this.isUxEvent(this.prevUxEvent)
    ? 'forward'
    : 'backward'

  targetNumber: number = 1
  targetUnit: Unit = this.units[0]

  get nextEventString (): TranslateResult {
    const { isUxEvent, nextUxEvent, $i18n } = this
    return isUxEvent(nextUxEvent)
      ? $i18n.t('RelativeDateInput.nextEvent')
      : $i18n.t('RelativeDateInput.atPresent')
  }

  get isJumpForward (): boolean {
    const { targetJumpDirection } = this
    return targetJumpDirection === 'forward'
  }

  get units (): Array<Unit> {
    return [
      {
        key: 'minute',
        add: addMinutes,
        diff: differenceInMinutes
      },
      {
        key: 'hour',
        add: addHours,
        diff: differenceInHours
      },
      {
        key: 'day',
        add: addDays,
        diff: differenceInDays
      },
      {
        key: 'month',
        add: addMonths,
        diff: differenceInMonths
      },
      {
        key: 'year',
        add: addYears,
        diff: differenceInYears
      }
    ]
  }

  get availableUnits (): Array<Unit> {
    const { isJumpForward, units, actualUx, targetDate } = this
    return units.filter(unit => !isJumpForward || unit.diff(new Date(actualUx.date), targetDate) > 0)
  }

  get initialUnit (): Unit {
    const { availableUnits, lastChosenUnitKey } = this
    const lastChosenUnit = availableUnits.find(unit => unit.key === lastChosenUnitKey)
    const isUnit = (unit: Unit | undefined): unit is Unit => unit !== undefined
    if (isUnit(lastChosenUnit)) return lastChosenUnit
    else return availableUnits[availableUnits.length - 1]
  }

  get maxTargetNumber (): number | boolean {
    const { isJumpForward, targetUnit, actualUx, targetDate } = this
    if (!isJumpForward) {
      return false
    }
    return targetUnit.diff(new Date(actualUx.date), targetDate)
  }

  get targetDate (): Date {
    const { isJumpForward, isUxEvent, prevUxEvent, nextUxEvent, actualUx } = this
    return isJumpForward && isUxEvent(prevUxEvent)
      ? new Date(prevUxEvent.date)
      : isUxEvent(nextUxEvent)
        ? new Date(nextUxEvent.date)
        : new Date(actualUx.date)
  }

  get newDate (): Date {
    const { isJumpForward, targetUnit, targetDate, targetNumber, actualUx } = this
    const sign = isJumpForward ? 1 : -1
    let date = targetUnit.add(targetDate, this.targetNumber * sign)
    if (targetUnit.key !== 'minute' && targetUnit.key !== 'hour') {
      date = startOfDay(date)
    } else {
      date = startOfMinute(date)
    }
    if (isJumpForward && isAfter(date, new Date(actualUx.date))) {
      this.targetNumber = targetUnit.diff(new Date(actualUx.date), targetDate)
      date = targetUnit.add(targetDate, this.targetNumber * sign)
    }
    return date
  }

  mounted () {
    this.input(this.newDate)
    this.targetUnit = this.initialUnit
  }

  @Watch('targetJumpDirection')
  onTargetJumpDirectionChanged (): void {
    this.targetNumber = 1
  }

  @Watch('targetUnit')
  onTargetUnitUpdated (): void {
    this.updateUnitKey(this.targetUnit.key)
  }

  @Watch('newDate')
  onNewDateUpdated (value: Date): void {
    if (!isValid(value)) {
      this.targetNumber = 1
    } else {
      this.input(value)
    }
  }

  @Emit()
  input (value: Date): string {
    return value.toISOString()
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
