<template>
  <div class="ux-event">
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
      @click="addUxEvent(newUxEvent); newUxEvent = createUxEvent()"
    >
      {{ $t("create") }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/interfaces'
import { format, isValid } from 'date-fns'

@Component({
  methods: {
    ...mapMutations(['addUxEvent'])
  }
})
export default class UxTimeline extends Vue {
  newUxEvent: UxEvent = this.createUxEvent()

  get isNewUxEventReady (): boolean {
    return this.newUxEvent.date instanceof Date && isValid(this.newUxEvent.date)
  }

  formatDate (date: Date): string {
    return format(date, 'YYYY-MM-DD')
  }

  createUxEvent (): UxEvent {
    return { date: {} as Date, score: 0, description: '' }
  }
}
</script>

<style scoped lang="sass">
.ux-event
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
