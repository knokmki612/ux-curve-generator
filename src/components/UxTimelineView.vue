<template>
  <div class="ux-timeline-view">
    <div class="line" />
    <div class="timeline">
      <section
        id="0"
        class="ux-event"
      >
        <h3 class="header">
          {{ $t('UxTimeline.expectedUx') }}
        </h3>
        <div class="inner">
          <h4 class="header -small">
            {{ $t('UxEvent.score') }}
          </h4>
          <p class="inline-block form w-8 text-center">
            {{ expectedUx.score }}
          </p>
        </div>
        <div class="inner">
          <h4 class="header -small">
            {{ $t('UxEvent.description') }}
          </h4>
          <p
            class="form whitespace-pre-wrap"
            v-text="expectedUx.description"
          />
        </div>
      </section>
      <ul
        v-if="!isUxEventsEmpty"
        class="ux-events"
      >
        <li
          v-for="(uxEvent, key) in uxEvents"
          :key="key"
          class="inner"
        >
          <section
            :id="key + 1"
            class="ux-event"
          >
            <div class="inner">
              <h3 class="header">
                {{ $tc('UxTimelineView.uxEvent', key + 1) }}
              </h3>
              <time
                class="block header -small"
                :datetime="uxEvent.date"
              >
                {{ dateFormat(uxEvent.date) }}
              </time>
            </div>
            <div class="inner">
              <h4 class="header -small">
                {{ $t('UxEvent.score') }}
              </h4>
              <p class="form w-8 text-center">
                {{ uxEvent.score }}
              </p>
            </div>
            <div class="inner">
              <h4 class="header -small">
                {{ $t('UxEvent.description') }}
              </h4>
              <p
                class="form whitespace-pre-wrap"
                v-text="uxEvent.description"
              />
            </div>
          </section>
          <RelativeDateString
            class="block ml-2"
            v-bind="relativeDateStringProps(key)"
          />
        </li>
      </ul>
      <section
        :id="uxEvents.length + 1"
        class="ux-event"
      >
        <div class="inner">
          <h3 class="header">
            {{ $t('UxTimeline.actualUx') }}
          </h3>
          <time
            class="block header -small"
            :datetime="actualUx.date"
          >
            {{ dateFormat(actualUx.date) }}
          </time>
        </div>
        <div class="inner">
          <h4 class="header -small">
            {{ $t('UxEvent.score') }}
          </h4>
          <p class="form w-8 text-center">
            {{ actualUx.score }}
          </p>
        </div>
        <div class="inner">
          <h4 class="header -small">
            {{ $t('UxEvent.description') }}
          </h4>
          <p
            class="form whitespace-pre-wrap"
            v-text="actualUx.description"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FixedUxEvent, UxEvent } from '@/types'
import RelativeDateString from 'atoms/RelativeDateString.vue'
import { format, getHours, getMinutes } from 'date-fns'

@Component({
  components: {
    RelativeDateString
  }
})
export default class UxTimelineView extends Vue {
  @Prop(Object) readonly expectedUx!: FixedUxEvent
  @Prop(Object) readonly actualUx!: UxEvent
  @Prop(Array) readonly uxEvents!: Array<UxEvent>

  get isUxEventsEmpty (): boolean {
    return this.uxEvents.length === 0
  }

  dateFormat (date: string): string {
    if (getHours(date) || getMinutes(date)) {
      return format(new Date(date), 'YYYY/MM/DD HH:mm:ss')
    }
    return format(new Date(date), 'YYYY/MM/DD')
  }

  relativeDateStringProps (key: number): object {
    const { uxEvents, actualUx } = this
    return {
      targetDate: new Date(uxEvents[key].date),
      nextDate: uxEvents.length > key + 1
        ? new Date(uxEvents[key + 1].date)
        : new Date(actualUx.date)
    }
  }
}
</script>

<style scoped lang="sass">
.ux-timeline-view
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

.ux-event
  > .inner
    > .header
      @apply font-bold text-lg

      & + *:not(.header)
        @apply mt-0

      &.-small
        @apply font-normal text-sm

        & + *:not(.header)
          @apply mt-1
</style>
