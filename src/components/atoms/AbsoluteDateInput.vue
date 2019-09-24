<template>
  <span class="absolute-date-input">
    <span class="inner">
      <input
        v-model="date"
        class="mr-2 form"
        type="date"
        :max="maxDate"
        :aria-label="$t('AbsoluteDateInput.dateLabel')"
      >
      <input
        v-model="time"
        class="form"
        type="time"
        :max="maxTime"
        :aria-label="$t('AbsoluteDateInput.timeLabel')"
      >
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UxEvent } from '@/types'
import { format, parse, isAfter } from 'date-fns'

@Component({
  computed: {
    ...mapState('ActualUx', ['actualUx'])
  }
})
export default class AbsoluteDateInput extends Vue {
  @Prop(String) readonly value!: string
  readonly actualUx!: UxEvent

  get maxDate (): string {
    return format(this.actualUx.date, 'YYYY-MM-DD')
  }

  get maxTime (): string {
    return format(this.actualUx.date, 'HH:mm')
  }

  get date (): string {
    return format(this.newDate, 'YYYY-MM-DD')
  }

  set date (value: string) {
    let newDate
    const { actualUx, date, time } = this
    if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(value)) {
      newDate = parse(`${date}T${time}`)
    } else {
      newDate = parse(`${value}T${time}`)
    }
    if (isAfter(newDate, actualUx.date)) {
      newDate = parse(`${format(actualUx.date, 'YYYY-MM-DD')}T${time}`)
    }
    this.newDate = newDate
  }

  get time (): string {
    return format(this.newDate, 'HH:mm')
  }

  set time (value: string) {
    let newDate
    const { actualUx, date } = this
    if (!/[0-9]{2}:[0-9]{2}/.test(value)) {
      newDate = parse(`${date}`)
    } else {
      newDate = parse(`${date}T${value}`)
    }
    if (isAfter(newDate, actualUx.date)) {
      newDate = parse(`${date}T${format(actualUx.date, 'HH:mm')}`)
    }
    this.newDate = newDate
  }

  get newDate (): Date {
    return new Date(this.value)
  }

  set newDate (value: Date) {
    this.input(value)
  }

  @Emit()
  input (value: Date): string {
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
