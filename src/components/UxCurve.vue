<template>
  <div class="ux-curve">
    <svg
      v-if="isReadyToDraw"
      :viewBox="`-${offset.viewBox} -${offset.viewBox} ${viewBox[0] + offset.viewBox * 2} ${viewBox[1] + offset.viewBox * 2}`"
    >
      <line
        x1="0"
        :y1="viewBox[1] / 2"
        :x2="viewBox[0]"
        :y2="viewBox[1] / 2"
        stroke-width="1"
        stroke="gray"
      />
      <line
        :x1="offset.scale"
        y1="0"
        :x2="offset.scale"
        :y2="viewBox[1]"
        stroke-width="1"
        stroke="gray"
      />
      <path
        :d="curve"
        fill="transparent"
        stroke="black"
      />
      <g v-if="hasLink">
        <a
          v-for="(drawableUxEvent, key) in drawableUxEvents"
          :key="key"
          :xlink:href="`#${key}`"
        >
          <circle
            :cx="drawableUxEvent[0]"
            :cy="drawableUxEvent[1]"
            r="10"
            fill="transparent"
          />
          <circle
            :cx="drawableUxEvent[0]"
            :cy="drawableUxEvent[1]"
            r="2"
            fill="black"
          />
        </a>
      </g>
      <g v-else>
        <circle
          v-for="(drawableUxEvent, key) in drawableUxEvents"
          :key="key"
          :cx="drawableUxEvent[0]"
          :cy="drawableUxEvent[1]"
          r="2"
          fill="black"
        />
      </g>
    </svg>
    <div
      v-else
    >
      <h2 class="text-3xl">
        {{ $t('UxCurveMessage.title') }}
      </h2>
      <ul class="list-disc mt-6 pl-4 leading-normal">
        <li
          v-for="(message, key) in messages"
          :key="key"
          class="text-xl"
        >
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TranslateResult } from 'vue-i18n'
import { FixedUxEvent, UxEvent } from '@/types'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'

@Component
export default class UxCurve extends Vue {
  @Prop(String) readonly subject!: string
  @Prop(Object) readonly expectedUx!: FixedUxEvent
  @Prop(Object) readonly actualUx!: UxEvent
  @Prop(Array) readonly uxEvents!: Array<UxEvent>
  @Prop(Boolean) readonly hasLink!: boolean
  offset: { viewBox: number, scale: number } = { viewBox: 2, scale: 20 }
  viewBox: [number, number] = [400, 200]

  get drawableUxEvents (): [number, number][] {
    let drawableUxEvents = [] as [number, number][]

    const y = scaleLinear()
      .domain([-100, 100])
      .range([this.viewBox[1], 0])

    if (this.uxEvents.length > 0) {
      const x = scaleTime()
        .domain([
          new Date(this.uxEvents[0].date),
          new Date(this.actualUx.date)
        ])
        .range([this.offset.scale, this.viewBox[0]])

      drawableUxEvents = this.uxEvents.map(uxEvent => {
        return [x(new Date(uxEvent.date)), y(uxEvent.score)] as [number, number]
      })
    }

    drawableUxEvents.splice(0, 0, [0, y(this.expectedUx.score)] as [number, number])
    drawableUxEvents.push([this.viewBox[0], y(this.actualUx.score)] as [number, number])

    return drawableUxEvents
  }

  get curve (): string | null {
    const curve = line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(curveMonotoneX)
    return curve(this.drawableUxEvents)
  }

  get messages (): Array<TranslateResult> {
    const { subject, expectedUx, actualUx, uxEvents, $i18n } = this
    return [
      ...subject.length === 0
        ? [$i18n.t('UxCurveMessage.subjectIsRequired')]
        : [],
      ...expectedUx.description.length === 0
        ? [$i18n.t('UxCurveMessage.expectedUxDescriptionIsRequired')]
        : [],
      ...actualUx.description.length === 0
        ? [$i18n.t('UxCurveMessage.actualUxDescriptionIsRequired')]
        : [],
      ...uxEvents.length < 3
        ? [$i18n.tc('UxCurveMessage.3UxEventsAreRequired', 3 - uxEvents.length)]
        : [],
      ...uxEvents.some(uxEvent => uxEvent.description.length === 0)
        ? [$i18n.t('UxCurveMessage.allUxEventsDescriptionAreRequired')]
        : []
    ]
  }

  get isReadyToDraw (): boolean {
    const { messages } = this
    return messages.length === 0
  }
}
</script>

<style scoped lang="sass">
.ux-curve
  @apply rounded shadow-md px-6 py-4 bg-white
</style>
