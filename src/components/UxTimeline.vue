<template>
  <div class="ux-timeline">
    <div class="line" />
    <div class="timeline">
      <section class="ux-event">
        <h3 class="header">
          {{ $t('expectedUx') }}
        </h3>
        <h4 class="header -small">
          {{ $t('score') }}
        </h4>
        <input
          :value="expectedUx.score"
          type="number"
          min="-100"
          max="100"
          class="form -score"
          @input="updateExpectedUx({ score: $event.target.value })"
        >
        <h4 class="header -small">
          {{ $t('description') }}
        </h4>
        <textarea
          :value="expectedUx.description"
          class="form -description"
          @input="updateExpectedUx({ description: $event.target.value })"
        />
      </section>
      <AddUxEventButton
        v-bind="addUxEventButtonProps(-1)"
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
          <section class="ux-event">
            <h3 class="header">
              {{ key + 1 }}.
            </h3>
            <h4 class="header -small">
              {{ $t('date') }}
            </h4>
            <AbsoluteDateInput
              :value="uxEvent.date"
              class="block"
              :disabled="isNewUxEventShown"
              @input="updateUxEvent({
                key, value: { date: $event } })"
            />
            <h4 class="header -small">
              {{ $t('score') }}
            </h4>
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
            <h4 class="header -small">
              {{ $t('description') }}
            </h4>
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
              :disabled="isNewUxEventShown"
              @click="deleteUxEvent({ key })"
            >
              {{ $t('delete') }}
            </button>
          </section>
          <AddUxEventButton
            v-bind="addUxEventButtonProps(key)"
            @click="showNewUxEvent"
            @finish="hideNewUxEvent"
          >
            <RelativeTimeString
              class="ml-2"
              v-bind="relativeDateStringProps(key)"
            />
          </AddUxEventButton>
        </li>
      </ul>
      <section class="ux-event">
        <h3 class="header">
          {{ $t('actualUx') }}
        </h3>
        <h4 class="header -small">
          {{ $t('score') }}
        </h4>
        <input
          :value="actualUx.score"
          type="number"
          min="-100"
          max="100"
          class="form -score"
          @input="updateActualUx({ score: $event.target.value })"
        >
        <h4 class="header -small">
          {{ $t('description') }}
        </h4>
        <textarea
          :value="actualUx.description"
          class="form -description"
          @input="updateActualUx({ description: $event.target.value })"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import AddUxEventButton from 'molecules/AddUxEventButton.vue'
import AbsoluteDateInput from 'atoms/AbsoluteDateInput.vue'
import RelativeTimeString from 'atoms/RelativeTimeString.vue'

@Component({
  components: {
    AddUxEventButton,
    AbsoluteDateInput,
    RelativeTimeString
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
  actualUx!: FixedUxEvent
  isNewUxEventShown: boolean = false

  get isUxEventsEmpty (): boolean {
    return this.uxEvents.length === 0
  }

  addUxEventButtonProps (key: number): object {
    const props: any = {
      isButtonEnabled: !this.isNewUxEventShown
    }
    if (!this.isUxEventsEmpty) {
      props.prevUxEvent = this.uxEvents[key]
    }
    if (this.uxEvents.length > key + 1) {
      props.nextUxEvent = this.uxEvents[key + 1]
    }
    return props
  }

  relativeDateStringProps (key: number): object {
    return {
      targetDate: this.uxEvents[key].date,
      nextDate: this.uxEvents.length > key + 1
        ? this.uxEvents[key + 1].date
        : new Date()
    }
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
    @apply rounded-l shadow-md bg-blue-600
    min-width: theme('width.2')

  > .timeline
    @apply flex-1

    > * ~ *
      @apply mt-4

.ux-events
  > .inner
    & ~ .inner
      @apply mt-4

    > * ~ *
      @apply mt-4

.ux-event
  @apply rounded-r shadow-md px-6 py-4 bg-gray-300

  & ~ &
    @apply mt-4

  > * ~ *
    @apply mt-2

  > * + .header
    @apply mt-4

  > .header + *:not(.header)
    @apply mt-1

  > .header
    @apply font-bold text-lg

    &.-small
      @apply font-normal text-sm

  > .form
    @apply block rounded shadow p-2
    &:focus
      @apply shadow-outline

    &.-score
      @apply w-20

    &.-description
      @apply w-full

  > .button
    @apply block
</style>
