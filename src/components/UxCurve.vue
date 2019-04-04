<template>
  <div
    class="ux-curve"
    :class="{'-hidden': isHidden}"
  >
    <svg :viewBox="`-${offset} -${offset} ${viewBox[0] + offset * 2} ${viewBox[1] + offset * 2}`">
      <line
        x1="0"
        :y1="viewBox[1] / 2"
        :x2="viewBox[0]"
        :y2="viewBox[1] / 2"
        stroke-width="1"
        stroke="gray"
      />
      <path
        :d="curve"
        fill="transparent"
        stroke="black"
      />
      <circle
        v-for="(drawableUxEvent, key) in drawableUxEvents"
        :key="key"
        :cx="drawableUxEvent[0]"
        :cy="drawableUxEvent[1]"
        r="2"
        fill="black"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UxEvent } from '@/interfaces'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear, scaleTime } from 'd3-scale'

@Component({
  computed: {
    ...mapState(['uxEvents'])
  }
})
export default class UxCurve extends Vue {
  uxEvents!: Array<UxEvent>
  offset: number = 2
  viewBox: [number, number] = [400, 200]

  get isHidden (): boolean {
    return this.uxEvents.length === 0
  }

  get drawableUxEvents (): [number, number][] {
    if (this.uxEvents.length === 0) return []

    const x = scaleTime()
      .domain([
        this.uxEvents[0].date,
        this.uxEvents[this.uxEvents.length - 1].date
      ])
      .range([0, this.viewBox[0]])
    const y = scaleLinear()
      .domain([-100, 100])
      .range([this.viewBox[1], 0])

    return this.uxEvents.map(value => {
      return [x(value.date), y(value.score)] as [number, number]
    })
  }

  get curve (): string | null {
    const curve = line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(curveMonotoneX)
    return curve(this.drawableUxEvents)
  }
}
</script>

<style scoped lang="sass">
.ux-curve
  @apply rounded shadow-lg px-6 py-4 bg-white

  &.-hidden
    @apply hidden
</style>
