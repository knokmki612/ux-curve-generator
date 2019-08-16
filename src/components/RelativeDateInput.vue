<template>
  <span class="relative-date-input">
    <template v-if="isPrev">
      前より
    </template>
    <template v-else>
      後より
    </template>
    <input
      type="number"
      class="form w-16"
    >
    <select class="form appearance-none text-center">
      <option>分</option>
      <option>時間</option>
      <option>日</option>
      <option>月</option>
      <option>年</option>
    </select>
    <template v-if="isPrev">
      後
    </template>
    <template v-else>
      前
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { format, isValid } from 'date-fns'

@Component
export default class RelativeDateInput extends Vue {
  @Prop(Date) readonly date: Date | undefined
  @Prop(Boolean) readonly isPrev: boolean | undefined
}
</script>

<style scoped lang="sass">
.relative-date-input
  > * ~ *
    @apply ml-2

  > .form
    @apply inline-block rounded shadow p-2
    &:focus
      @apply shadow-outline
</style>
