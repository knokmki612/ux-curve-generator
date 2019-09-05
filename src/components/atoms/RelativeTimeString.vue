<template>
  <i18n
    tag="span"
    path="relativeTime"
    class="relative-time-string"
  >
    <span slot="time">
      <template
        v-if="years"
      >{{ $tc('year', years) }}{{ $t('spaceIfNeed') }}</template>
      <template
        v-if="months"
      >{{ $tc('month', months) }}{{ $t('spaceIfNeed') }}</template>
      <template
        v-if="days"
      >{{ $tc('day', days) }}{{ $t('spaceIfNeed') }}</template>
      <template
        v-if="hours && isLessThanADay"
      >{{ $tc('hour', hours) }}{{ $t('spaceIfNeed') }}</template>
      <template
        v-if="minutes && isLessThanADay"
      >{{ $tc('minute', minutes) }}{{ $t('spaceIfNeed') }}</template>
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
export default class RelativeTimeString extends Vue {
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
