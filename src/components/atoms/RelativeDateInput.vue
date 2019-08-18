<template>
  <span class="relative-date-input">
    <template v-if="isForwardTimeJump">
      前のエピソードから
    </template>
    <template v-else>
      次のエピソードより
    </template>
    <span class="input">
      <input
        v-model="targetNumber"
        type="number"
        class="form w-16"
      >
      <select
        v-model="targetUnit"
        class="form appearance-none text-center"
      >
        <option value="minute">{{ $tc('minute', targetNumber, { n: '' }) }}</option>
        <option value="hour">{{ $tc('hour', targetNumber, { n: '' }) }}</option>
        <option value="day">{{ $tc('day', targetNumber, { n: '' }) }}</option>
        <option value="month">{{ $tc('month', targetNumber, { n: '' }) }}</option>
        <option value="year">{{ $tc('year', targetNumber, { n: '' }) }}</option>
      </select>
      <template v-if="isForwardTimeJump">
        後
      </template>
      <template v-else>
        前
      </template>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { format, isValid } from 'date-fns'

@Component
export default class RelativeDateInput extends Vue {
  @Prop(Date) readonly referenceDate: Date | undefined
  @Prop(Boolean) readonly isForwardTimeJump: boolean | undefined
  @Prop([Date, Object]) readonly value!: Date | object
  targetNumber: number = 1
  targetUnit: string = 'day'
}
</script>

<style scoped lang="sass">
.relative-date-input
  > .input
    @apply whitespace-no-wrap

    > * ~ *
      @apply ml-2

    > .form
      @apply leading-tight
</style>
