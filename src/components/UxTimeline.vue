<template>
  <div class="ux-timeline">
    <div class="line" />
    <div class="timeline">
      <section class="ux-event">
        <h3 class="header">
          {{ $t('UxTimeline.expectedUx') }}
        </h3>
        <h4 class="header -small">
          {{ $t('UxEvent.score') }}
        </h4>
        <div class="flex">
          <input
            :value="expectedUx.score"
            type="number"
            min="-100"
            max="100"
            class="form w-16"
            @input="updateExpectedUx({ score: $event.target.value })"
          >
          <input
            v-model="expectedUx.score"
            type="range"
            min="-100"
            max="100"
            class="rounded ml-2 flex-1"
            @input="updateExpectedUx({ score: $event.target.value })"
          >
        </div>
        <h4 class="header -small">
          {{ $t('UxEvent.description') }}
        </h4>
        <textarea
          :value="expectedUx.description"
          class="form w-full"
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
              {{ $t('UxEvent.date') }}
            </h4>
            <AbsoluteDateInput
              :value="uxEvent.date"
              class="block"
              :disabled="isNewUxEventShown"
              @input="updateUxEvent({
                key, value: { date: $event } })"
            />
            <h4 class="header -small">
              {{ $t('UxEvent.score') }}
            </h4>
            <div class="flex">
              <input
                :value="uxEvent.score"
                type="number"
                min="-100"
                max="100"
                class="form w-16"
                @input="updateUxEvent({
                  key, value: { score: $event.target.value }
                })"
              >
              <input
                v-model="uxEvent.score"
                type="range"
                min="-100"
                max="100"
                class="rounded ml-2 flex-1"
                @input="updateUxEvent({
                  key, value: { score: $event.target.value }
                })"
              >
            </div>
            <h4 class="header -small">
              {{ $t('UxEvent.description') }}
            </h4>
            <textarea
              :value="uxEvent.description"
              class="form w-full"
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
              {{ $t('UxEvent.delete') }}
            </button>
          </section>
          <AddUxEventButton
            v-bind="addUxEventButtonProps(key)"
            @click="showNewUxEvent"
            @finish="hideNewUxEvent"
          >
            <RelativeDateString
              class="ml-2"
              v-bind="relativeDateStringProps(key)"
            />
          </AddUxEventButton>
        </li>
      </ul>
      <section class="ux-event">
        <h3 class="header">
          {{ $t('UxTimeline.actualUx') }}
        </h3>
        <h4 class="header -small">
          {{ $t('UxEvent.score') }}
        </h4>
        <div class="flex">
          <input
            :value="actualUx.score"
            type="number"
            min="-100"
            max="100"
            class="form w-16"
            @input="updateActualUx({ score: $event.target.value })"
          >
          <input
            v-model="actualUx.score"
            type="range"
            min="-100"
            max="100"
            class="rounded ml-2 flex-1"
            @input="updateActualUx({ score: $event.target.value })"
          >
        </div>
        <h4 class="header -small">
          {{ $t('UxEvent.description') }}
        </h4>
        <textarea
          :value="actualUx.description"
          class="form w-full"
          @input="updateActualUx({ description: $event.target.value })"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { UxEvent } from '@/types'
import AddUxEventButton from 'molecules/AddUxEventButton.vue'
import AbsoluteDateInput from 'atoms/AbsoluteDateInput.vue'
import RelativeDateString from 'atoms/RelativeDateString.vue'

@Component({
  components: {
    AddUxEventButton,
    AbsoluteDateInput,
    RelativeDateString
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
  actualUx!: UxEvent
  isNewUxEventShown: boolean = false

  get isUxEventsEmpty (): boolean {
    return this.uxEvents.length === 0
  }

  addUxEventButtonProps (key: number): object {
    const props: any = {
      isButtonEnabled: !this.isNewUxEventShown
    }
    if (!this.isUxEventsEmpty) {
      props.uxEvent = this.uxEvents[key]
    }
    if (this.uxEvents.length > key + 1) {
      props.nextUxEvent = this.uxEvents[key + 1]
    }
    return props
  }

  relativeDateStringProps (key: number): object {
    const { uxEvents, actualUx } = this
    return {
      targetDate: uxEvents[key].date,
      nextDate: uxEvents.length > key + 1
        ? uxEvents[key + 1].date
        : actualUx.date
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
    @apply rounded-l bg-blue-600
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
</style>
