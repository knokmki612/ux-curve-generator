<template>
  <input
    :value="formatDate(value)"
    type="date"
    class="date-input"
    @input="input"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { format } from 'date-fns'

@Component
export default class DateInput extends Vue {
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
</style>
