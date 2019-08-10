<template>
  <div class="add-ux-event-button">
    <button
      v-if="isButtonShown"
      type="button"
      class="add-button"
      :disabled="!isButtonEnabled"
      @click="click"
    >
      <span class="button">
        {{ $t("add") }}
      </span>
    </button>
    <NewUxEvent
      v-else
      @finish="finish"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import NewUxEvent from './NewUxEvent.vue'
import { format, isValid } from 'date-fns'

@Component({
  components: { NewUxEvent }
})
export default class AddUxEventButton extends Vue {
  @Prop(Boolean) readonly isButtonEnabled: boolean | undefined
  isButtonShown: boolean = true

  @Emit()
  click (): void {
    this.isButtonShown = false
  }

  @Emit()
  finish (): void {
    this.isButtonShown = true
  }
}
</script>

<style scoped lang="sass">
.add-button
  @apply flex

  &::before
    $button-height: (1rem * 1.25 + 0.5rem * 2) / 2
    content: ""
    border-top: $button-height solid transparent
    border-right: 1.5rem solid theme('colors.blue.600')
    border-bottom: $button-height solid transparent

  > .button
    @apply rounded-l-none bg-blue-600

  &:hover
    &::before
      border-right: 1.5rem solid theme('colors.blue.700')

    > .button
      @apply bg-blue-700

  &:disabled
    @apply cursor-not-allowed

    &::before
      border-right: 1.5rem solid theme('colors.gray.400')

    > .button
      @apply bg-gray-400
</style>
