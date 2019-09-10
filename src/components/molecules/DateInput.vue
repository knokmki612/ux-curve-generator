<template>
  <div class="date-input">
    <BaseTab
      v-model="inputType"
      :tab-items="[$t('DateInput.relative'), $t('DateInput.absolute')]"
    />
    <RelativeDateInput
      v-show="inputType === 0"
      v-model="newDate"
      v-bind="relativeDateInputProps"
    />
    <AbsoluteDateInput
      v-show="inputType === 1"
      v-model="newDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UxEvent } from '@/types'
import BaseTab from 'atoms/BaseTab.vue'
import AbsoluteDateInput from 'atoms/AbsoluteDateInput.vue'
import RelativeDateInput from 'atoms/RelativeDateInput.vue'

@Component({
  components: {
    BaseTab,
    AbsoluteDateInput,
    RelativeDateInput
  }
})
export default class DateInput extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  @Prop([Date, Object]) readonly value!: Date | object
  inputType: number = 0
  absoluteDate: Date = this.value as Date
  relativeDate: Date = this.value as Date

  get relativeDateInputProps (): object {
    const { prevUxEvent, nextUxEvent } = this
    return {
      prevUxEvent,
      nextUxEvent
    }
  }

  get newDate (): Date {
    return this.value as Date
  }

  set newDate (value: Date) {
    this.input(value)
  }

  @Watch('inputType')
  onTabChanged (inputType: number): void {
    if (inputType === 0) {
      this.absoluteDate = this.newDate
      this.newDate = this.relativeDate
    }
    if (inputType === 1) {
      this.relativeDate = this.newDate
      this.newDate = this.absoluteDate
    }
  }

  @Emit()
  input (value: Date): Date {
    return value
  }
}
</script>

<style scoped lang="sass">
.relative-date-input,
.absolute-date-input
  @apply mt-2 block

  min-height: 3rem
</style>
