<template>
  <span class="date-input">
    <input
      :value="formatDate(value)"
      class="form"
      type="date"
      @input="input"
    >
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { format } from 'date-fns'

@Component
export default class AbsoluteDateInput extends Vue {
  @Prop([Date, Object]) readonly value!: Date | object

  formatDate (date: Date): string {
    return format(date, 'YYYY-MM-DD')
  }

  @Emit()
  input (event: any): Date {
    return new Date(event.target.value)
  }
}
</script>

<style scoped lang="sass">
.date-input
  > * ~ *
    @apply ml-2

  > .form
    @apply rounded shadow p-2 leading-tight

    &:focus
      @apply shadow-outline
</style>
