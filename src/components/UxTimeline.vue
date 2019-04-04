<template>
  <div>
    <div
      class="ux-timeline"
      :class="{ '-hidden': isHidden }"
    >
      <ul
        class="ux-events"
      >
        <li
          v-for="(uxEvent, key) in uxEvents"
          :key="key"
          class="ux-event"
        >
          <span>{{ key + 1 }}.</span>
          <input
            :value="formatDate(uxEvent.date)"
            type="date"
            class="form -date"
            @input="updateUxEvent({
              key, value: { date: new Date($event.target.value) } })"
          >
          <input
            :value="uxEvent.score"
            type="number"
            min="-100"
            max="100"
            class="form -score"
            @input="updateUxEvent({
              key, value: { score: $event.target.value }
            })"
          >
          <textarea
            :value="uxEvent.description"
            class="form -description"
            @blur="updateUxEvent({
              key, value: { description: $event.target.value }
            })"
          />
          <button
            type="button"
            class="button -red"
            @click="deleteUxEvent({ key })"
          >
            {{ $t("delete") }}
          </button>
        </li>
      </ul>
    </div>
    <div class="ux-timeline mt-8">
      <div
        class="ux-event"
      >
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
          {{ $t("add") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { UxEvent } from '@/interfaces'
import { format, isValid } from 'date-fns'

@Component({
  computed: {
    ...mapState(['uxEvents'])
  },
  methods: {
    ...mapMutations(['addUxEvent', 'updateUxEvent', 'deleteUxEvent'])
  }
})
export default class UxTimeline extends Vue {
  uxEvents!: Array<UxEvent>
  newUxEvent: UxEvent = this.createUxEvent()

  get isHidden (): boolean {
    return this.uxEvents.length === 0
  }

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
.ux-timeline
  @apply rounded shadow-lg px-6 py-4 bg-grey-light

  &.-hidden
    @apply hidden

.ux-events
  @apply list-reset

  > .ux-event ~ .ux-event
    @apply border-t border-grey mt-6 pt-6

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
