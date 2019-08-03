<template>
  <div class="ux-timeline">
    <div class="line" />
    <div class="timelines">
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
      </div>
      <div
        class="timeline"
        :class="{ '-hidden': isHidden }"
      >
        <ul class="ux-events">
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
          </li>
        </ul>
      </div>
      <div class="timeline">
        <NewUxEvent />
      </div>
      <div class="timeline">
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/interfaces'
import NewUxEvent from './NewUxEvent.vue'
import { format, isValid } from 'date-fns'

@Component({
  components: {
    NewUxEvent
  },
  computed: {
    ...mapState(['expectedUx', 'actualUx', 'uxEvents'])
  },
  methods: {
    ...mapMutations(['updateExpectedUx', 'updateActualUx', 'updateUxEvent', 'deleteUxEvent'])
  }
})
export default class UxTimeline extends Vue {
  uxEvents!: Array<UxEvent>

  get isHidden (): boolean {
    return this.uxEvents.length === 0
  }

  formatDate (date: Date): string {
    return format(date, 'YYYY-MM-DD')
  }
}
</script>

<style scoped lang="sass">
.ux-timeline
  @apply flex

  > .line
    @apply w-2 rounded-tl rounded-bl shadow-md bg-blue

  > .timelines
    @apply flex-grow

    > .timeline
      @apply rounded-tr rounded-br shadow-md px-6 py-4 bg-grey-light

      &.-hidden
        @apply hidden

    > .timeline ~ .timeline
      @apply mt-10

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
