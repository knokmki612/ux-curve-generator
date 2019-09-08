<template>
  <span class="absolute-date-input">
    <span class="inner">
      <input
        v-model="date"
        class="mr-2 form"
        type="date"
      >
      <input
        v-model="time"
        class="form"
        type="time"
      >
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { format, parse } from 'date-fns'

@Component
export default class AbsoluteDateInput extends Vue {
  @Prop([Date, Object]) readonly value!: Date | object

  get date (): string {
    return format(this.newDate, 'YYYY-MM-DD')
  }

  set date (value: string) {
    const { time } = this
    this.newDate = parse(`${value}T${time}`)
  }

  get time (): string {
    return format(this.newDate, 'HH:mm')
  }

  set time (value: string) {
    const { date } = this
    if (/[0-9]{2}:[0-9]/.test(value)) {
      this.newDate = parse(`${date}T${value}`)
    }
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
.absolute-date-input
  > .inner
    @apply -mt-2 inline-block

    > *
      @apply mt-2
</style>
