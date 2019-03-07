<template>
  <div
    class="ux-curve"
    :class="{'-hidden': isHidden}"
  >
    <svg viewBox="0 0 400 200">
      <path
        :d="catmulRomBezierPath(drawableUxEvents)"
        fill="transparent"
        stroke="black"
      />
      <circle
        v-for="(drawableUxEvent, key) in drawableUxEvents"
        :key="key"
        :cx="drawableUxEvent.x"
        :cy="drawableUxEvent.y"
        r="2"
        fill="black"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UxEvent, DrawableUxEvent } from '@/interfaces'

@Component({
  computed: {
    ...mapState(['uxEvents'])
  }
})
export default class UxCurve extends Vue {
  uxEvents!: Array<UxEvent>

  get isHidden (): Boolean {
    return this.uxEvents.length === 0
  }

  get drawableUxEvents (): Array<DrawableUxEvent> {
    return this.uxEvents.map((uxEvent, index) => {
      return {
        x: index * 10,
        y: -uxEvent.score + 100
      }
    })
  }

  catmulRomBezierPath (
    points: Array<DrawableUxEvent>, alpha: Number = 1 / 2
  ): String {
    if (points.length === 0) return ''
    let path = `M ${points[0].x} ${points[0].y} `

    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = i > 0 ? points[i - 1] : points[0]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = i < points.length - 2 ? points[i + 2] : p2
      const bp0 = {
        x: p1.x + (p2.x - p0.x) / 3 * alpha,
        y: p1.y + (p2.y - p0.y) / 3 * alpha
      }
      const bp1 = {
        x: p2.x - (p3.x - p1.x) / 3 * alpha,
        y: p2.y - (p3.y - p1.y) / 3 * alpha
      }
      path += `C ${bp0.x} ${bp0.y}, ${bp1.x} ${bp1.y}, ${p2.x} ${p2.y} `
    }
    return path
  }
}
</script>

<style scoped lang="sass">
.ux-curve
  @apply rounded shadow-lg px-6 py-4 bg-white

  &.-hidden
    @apply hidden
</style>
