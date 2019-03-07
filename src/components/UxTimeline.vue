<template>
  <div class="ux-timeline">
    <ul
      class="ux-events"
      :class="{ '-hidden': isHidden }"
    >
      <li
        v-for="(uxEvent, key) in uxEvents"
        :key="key"
        class="ux-event"
      >
        <span>{{ key + 1 }}.</span>
        <input
          :value="uxEvent.date"
          type="date"
          class="form -date"
          @blur="updateUxEvent({
            key, value: { date: $event.target.value } })"
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
    <button
      type="button"
      class="button -blue"
      @click="createUxEvent"
    >
      {{ $t("add") }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { UxEvent } from '@/interfaces'

@Component({
  computed: {
    ...mapState(['uxEvents'])
  },
  methods: {
    ...mapMutations(['createUxEvent', 'updateUxEvent', 'deleteUxEvent'])
  }
})
export default class UxTimeline extends Vue {
  uxEvents!: Array<UxEvent>

  get isHidden (): boolean {
    return this.uxEvents.length === 0
  }
}
</script>

<style scoped lang="sass">
.ux-timeline
  @apply rounded shadow-lg px-6 py-4 bg-grey-light

  > .ux-events:not(.-hidden) + .button
    @apply mt-6

.ux-events
  @apply list-reset

  &.-hidden
    @apply hidden

  > .ux-event ~ .ux-event
    @apply mt-6

.ux-event
  @apply border-b border-grey pb-6

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
