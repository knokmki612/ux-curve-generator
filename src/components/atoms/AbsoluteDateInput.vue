<template>
  <span class="absolute-date-input">
    <span class="inner">
      <input
        :value="date"
        class="mr-2 form"
        type="date"
        :max="maxDate"
        :disabled="disabled"
        :aria-label="$t('AbsoluteDateInput.dateLabel')"
        @input="date = new String(updateDate($event))"
        @blur="datetime = updateDatetime(date, time)"
      >
      <input
        :value="time"
        class="form"
        type="time"
        :max="maxTime"
        :disabled="disabled"
        :aria-label="$t('AbsoluteDateInput.timeLabel')"
        @input="time = new String(updateTime($event))"
        @blur="datetime = updateDatetime(date, time)"
      >
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UxEvent } from '@/types'
import { format, isValid, isAfter } from 'date-fns'

@Component({
  computed: {
    ...mapState('ActualUx', ['actualUx'])
  }
})
export default class AbsoluteDateInput extends Vue {
  @Prop(String) readonly value!: string
  @Prop(Boolean) readonly disabled!: boolean
  readonly actualUx!: UxEvent
  date: string = this.formatDate(this.datetime)
  time: string = this.formatTime(this.datetime)

  get maxDate (): string {
    return this.formatDate(new Date(this.actualUx.date))
  }

  get maxTime (): string {
    return this.formatTime(new Date(this.actualUx.date))
  }

  get datetime (): Date {
    return new Date(this.value)
  }

  set datetime (value: Date) {
    this.input(value)
  }

  formatDate (date: Date): string {
    return isValid(date) ? format(date, 'yyyy-MM-dd') : ''
  }

  formatTime (date: Date): string {
    return isValid(date) ? format(date, 'HH:mm') : '00:00'
  }

  isValidDate (date: string): boolean {
    return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date)
  }

  isValidTime (time: string): boolean {
    return /[0-9]{2}:[0-9]{2}/.test(time)
  }

  updateDate ({ target: { value: date } }: { target: { value: string } }): string {
    const { datetime, actualUx, isValidDate, formatDate, formatTime } = this
    if (!isValidDate(date)) {
      return formatDate(datetime)
    }
    if (isAfter(new Date(`${date}T${this.time}`), new Date(actualUx.date))) {
      this.time = formatTime(new Date(actualUx.date))
      return formatDate(new Date(actualUx.date))
    }
    return date
  }

  updateTime ({ target: { value: time } }: { target: { value: string } }): string {
    const { datetime, actualUx, isValidTime, formatTime } = this
    if (!isValidTime(time)) {
      return formatTime(datetime)
    }
    if (isAfter(new Date(`${this.date}T${time}`), new Date(actualUx.date))) {
      return formatTime(new Date(actualUx.date))
    }
    return time
  }

  updateDatetime (date: string, time: string): Date {
    const { value, actualUx, isValidDate } = this
    if (!isValidDate(date)) {
      return new Date('')
    }
    return new Date(`${date}T${time}`)
  }

  @Emit()
  input (value: Date): string {
    if (!isValid(value)) {
      return ''
    }
    return value.toISOString()
  }
}
</script>

<style scoped lang="sass">
.absolute-date-input
  > .inner
    @apply -mt-2 inline-block

    > *
      @apply mt-2
</style>
