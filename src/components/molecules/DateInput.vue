<template>
  <div class="date-input">
    <BaseTab
      v-model="inputType"
      :tab-items="['相対', '絶対']"
    />
    <RelativeDateInput
      v-show="inputType === 0"
      v-model="newDate"
      v-bind="relativeDateInputProps"
    >
      <select
        v-if="prevUxEvent"
        v-model="targetJumpDirection"
        class="form appearance-none"
      >
        <option value="forward">
          前のエピソード
        </option>
        <option value="backward">
          次のエピソード
        </option>
      </select>
      <span v-else>次のエピソード</span>
    </RelativeDateInput>
    <AbsoluteDateInput
      v-show="inputType === 1"
      v-model="newDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
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
  targetJumpDirection: string = this.prevUxEvent === undefined
    ? 'backward'
    : 'forward'

  get isJumpForward (): boolean {
    const { targetJumpDirection } = this
    return targetJumpDirection === 'forward'
  }

  get relativeDateInputProps (): object {
    const { isJumpForward, isUxEvent, prevUxEvent, nextUxEvent } = this
    return {
      isJumpForward,
      targetDate: isJumpForward && isUxEvent(prevUxEvent)
        ? prevUxEvent.date
        : isUxEvent(nextUxEvent)
          ? nextUxEvent.date
          : new Date()
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

  isUxEvent (uxEvent: UxEvent | undefined): uxEvent is UxEvent {
    return uxEvent !== undefined
  }
}
</script>

<style scoped lang="sass">
.date-input
  > * ~ *
    @apply mt-2

.relative-date-input,
.absolute-date-input
  @apply block

  min-height: 2.5rem
</style>
