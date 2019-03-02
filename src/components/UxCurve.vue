<template>
  <div
    class="ux-curve"
    :class="{'-hidden': isHidden}"
  >
    <svg viewBox="0 0 400 200">
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

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
}
</script>

<style scoped lang="sass">
.ux-curve
  @apply rounded shadow-lg px-6 py-4 bg-white

  &.-hidden
    @apply hidden
</style>
