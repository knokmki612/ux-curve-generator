<template>
  <div class="ux-timeline">
    <div class="line" />
    <div class="timeline">
      <div class="ux-event">
        <span>{{ $t("expectedUx") }}</span>
        <input
          :value="expectedUx.score"
          type="number"
          min="-100"
          max="100"
          class="form -score"
          @input="updateExpectedUx({ score: $event.target.value })"
        >
        <textarea
          :value="expectedUx.description"
          class="form -description"
          @input="updateExpectedUx({ description: $event.target.value })"
        />
      </div>
      <AddUxEventButton
        v-bind="addUxEventButtonProps"
        @click="showNewUxEvent"
        @finish="hideNewUxEvent"
      />
      <ul
        v-if="!isUxEventsEmpty"
        class="ux-events"
      >
        <li
          v-for="(uxEvent, key) in uxEvents"
          :key="key"
          class="inner"
        >
          <div class="ux-event">
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
              @input="updateUxEvent({
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
          </div>
          <AddUxEventButton
            v-bind="addUxEventButtonProps"
            @click="showNewUxEvent"
            @finish="hideNewUxEvent"
          />
        </li>
      </ul>
      <div class="ux-event">
        <span>{{ $t("actualUx") }}</span>
        <input
          :value="actualUx.score"
          type="number"
          min="-100"
          max="100"
          class="form -score"
          @input="updateActualUx({ score: $event.target.value })"
        >
        <textarea
          :value="actualUx.description"
          class="form -description"
          @input="updateActualUx({ description: $event.target.value })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/interfaces'
import AddUxEventButton from './AddUxEventButton.vue'
import { format, isValid } from 'date-fns'

@Component({
  components: { AddUxEventButton },
  computed: {
    ...mapState(['expectedUx', 'actualUx', 'uxEvents'])
  },
  methods: {
    ...mapMutations(['updateExpectedUx', 'updateActualUx', 'updateUxEvent', 'deleteUxEvent'])
  }
})
export default class UxTimeline extends Vue {
  uxEvents!: Array<UxEvent>
  isNewUxEventShown: boolean = false

  get isUxEventsEmpty (): boolean {
    return this.uxEvents.length === 0
  }

  get addUxEventButtonProps (): object {
    return {
      isButtonEnabled: !this.isNewUxEventShown
    }
  }

  formatDate (date: Date): string {
    return format(date, 'YYYY-MM-DD')
  }

  showNewUxEvent (): void {
    this.isNewUxEventShown = true
  }

  hideNewUxEvent (): void {
    this.isNewUxEventShown = false
  }
}
</script>

<style scoped lang="sass">
.ux-timeline
  @apply flex

  > .line
    @apply w-2 rounded-l shadow-md bg-blue-600

  > .timeline
    @apply flex-grow

    > * ~ *
      @apply mt-5

.ux-events
  @apply list-none

  > .inner ~ .inner
    @apply mt-5

.ux-event
  @apply rounded-r shadow-md px-6 py-4 bg-gray-300

  & + &
    @apply mt-5

  & + .add-ux-event-button
    @apply mt-5

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
