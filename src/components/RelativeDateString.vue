<template>
  <span class="relative-date-string">
    <template v-if="years">{{ years }}年</template>
    <template v-if="months">{{ months }}ヶ月</template>
    <template v-if="days">{{ days }}日</template>
    <template v-if="hours && isLessThanADay">{{ hours }}時間</template>
    <template v-if="minutes && isLessThanADay">{{ minutes }}分</template>後
  </span>
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
