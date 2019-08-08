<template>
  <div class="new-ux-event">
    <input
      :value="formatDate(newUxEvent.date)"
      type="date"
      class="form -date"
      @input="newUxEvent.date = new Date($event.target.value)"
    >
    <input
      v-model="newUxEvent.score"
      type="number"
      min="-100"
      max="100"
      class="form -score"
    >
    <textarea
      v-model="newUxEvent.description"
      class="form -description"
    />
    <button
      type="button"
      class="button -blue"
      :disabled="!isNewUxEventReady"
      @click="emitFinish"
    >
      {{ $t("create") }}
    </button>
    <button
      type="button"
      class="button -red"
      @click="$emit('finish')"
    >
      {{ $t("cancel") }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import { format, isValid } from 'date-fns'

@Component({
  methods: {
    ...mapMutations(['addUxEvent'])
  }
})
export default class NewUxEvent extends Vue {
  newUxEvent: UxEvent = this.createUxEvent()
  private addUxEvent!: (payload: UxEvent) => void

  get isNewUxEventReady (): boolean {
    return this.newUxEvent.date instanceof Date && isValid(this.newUxEvent.date)
  }

  formatDate (date: Date): string {
    return format(date, 'YYYY-MM-DD')
  }

  createUxEvent (): UxEvent {
    return { date: {} as Date, score: 0, description: '' }
  }

  emitFinish (): void {
    this.addUxEvent(this.newUxEvent)
    this.newUxEvent = this.createUxEvent()
    this.$emit('finish')
  }
}
</script>

<style scoped lang="sass">
.new-ux-event
  @apply rounded-r shadow-md px-6 py-4 bg-gray-300

  > * ~ *
    @apply mt-2

  > .form
    @apply block rounded shadow p-2
    &:focus
      @apply shadow-outline

    &.-description
      @apply w-full

  > .button
    @apply block
</style>
