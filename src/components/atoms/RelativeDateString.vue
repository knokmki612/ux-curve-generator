<template>
  <i18n
    tag="span"
    path="RelativeDateString.path"
    class="relative-date-string"
  >
    <span slot="time">
      <template
        v-if="years"
      >{{ $tc('Relative.year', years) }}{{ $t('RelativeDateString.spaceIfNeeded') }}</template>
      <template
        v-if="months"
      >{{ $tc('Relative.month', months) }}{{ $t('RelativeDateString.spaceIfNeeded') }}</template>
      <template
        v-if="days"
      >{{ $tc('Relative.day', days) }}{{ $t('RelativeDateString.spaceIfNeeded') }}</template>
      <template
        v-if="hours && isLessThanADay"
      >{{ $tc('Relative.hour', hours) }}{{ $t('RelativeDateString.spaceIfNeeded') }}</template>
      <template
        v-if="minutes && isLessThanADay"
      >{{ $tc('Relative.minute', minutes) }}{{ $t('RelativeDateString.spaceIfNeeded') }}</template>
      <template
        v-if="!hours || !isLessThanADay"
      >{{ $t('RelativeDateString.suffix') }}</template>
    </span>
  </i18n>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  subYears,
  subMonths,
  subDays,
  subHours,
  subMinutes
} from 'date-fns'

@Component
export default class RelativeDateString extends Vue {
  @Prop(Date) readonly targetDate!: Date
  @Prop(Date) readonly nextDate!: Date
  years: number = 0
  months: number = 0
  days: number = 0
  hours: number = 0
  minutes: number = 0

  get isLessThanADay (): boolean {
    const { years, months, days } = this
    return years === 0 && months === 0 && days === 0
  }

  mounted () {
    this.relativeDate(this.nextDate)
  }

  @Watch('nextDate')
  relativeDate (val: Date): void {
    let date = val
    this.years = differenceInYears(date, this.targetDate)
    date = subYears(date, this.years)
    this.months = differenceInMonths(date, this.targetDate)
    date = subMonths(date, this.months)
    this.days = differenceInDays(date, this.targetDate)
    date = subDays(date, this.days)
    this.hours = differenceInHours(date, this.targetDate)
    date = subHours(date, this.hours)
    this.minutes = differenceInMinutes(date, this.targetDate)
  }
}
</script>

<style scoped lang="sass">
</style>
