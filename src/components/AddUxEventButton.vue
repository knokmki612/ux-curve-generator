<template>
  <div class="add-ux-event-button">
    <button
      v-if="isButtonShown"
      type="button"
      class="button -blue"
      :disabled="!isButtonEnabled"
      @click="emitClick"
    >
      {{ $t("add") }}
    </button>
    <NewUxEvent
      v-else
      @finish="emitFinish"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/interfaces'
import NewUxEvent from './NewUxEvent.vue'
import { format, isValid } from 'date-fns'

@Component({
  components: { NewUxEvent }
})
export default class AddUxEventButton extends Vue {
  @Prop(Boolean) readonly isButtonEnabled: boolean | undefined
  isButtonShown: boolean = true

  emitClick (): void {
    this.isButtonShown = false
    this.$emit('click')
  }

  emitFinish (): void {
    this.isButtonShown = true
    this.$emit('finish')
  }
}
</script>

<style scoped lang="sass">
.button
  @apply rounded-l-none
</style>
