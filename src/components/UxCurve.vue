<template>
  <div
    class="ux-curve"
    :class="{'-hidden': isHidden}"
  >
    <svg viewBox="0 0 400 200">
      <g
        v-for="(drawableUxEvent, key) in drawableUxEvents"
        :key="key"
      >
        <circle
          :cx="drawableUxEvent.x"
          :cy="drawableUxEvent.y"
          r="2"
          fill="black"
        />
      </g>
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
}
</script>

<style scoped lang="sass">
.ux-curve
  @apply rounded shadow-lg px-6 py-4 bg-white

  &.-hidden
    @apply hidden
</style>
