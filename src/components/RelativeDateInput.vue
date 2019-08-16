<template>
  <span class="relative-date-input">
    <template v-if="isPrev">
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
      <select class="form appearance-none text-center">
        <option>{{ $tc('minute', targetNumber, { n: '' }) }}</option>
        <option>{{ $tc('hour', targetNumber, { n: '' }) }}</option>
        <option selected>{{ $tc('day', targetNumber, { n: '' }) }}</option>
        <option>{{ $tc('month', targetNumber, { n: '' }) }}</option>
        <option>{{ $tc('year', targetNumber, { n: '' }) }}</option>
      </select>
      <template v-if="isPrev">
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
  @Prop(Date) readonly date: Date | undefined
  @Prop(Boolean) readonly isPrev: boolean | undefined
  targetNumber: number = 1
}
</script>

<style scoped lang="sass">
.relative-date-input
  @apply leading-normal

  > .input
    @apply whitespace-no-wrap

    > * ~ *
      @apply ml-2

    > .form
      @apply rounded shadow p-2 leading-tight

      &:focus
        @apply shadow-outline
</style>
