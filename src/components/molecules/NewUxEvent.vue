<template>
  <section class="new-ux-event ux-event">
    <h3 class="header">
      {{ $t('newEvent') }}
    </h3>
    <h4 class="header -small">
      {{ $t('date') }}
    </h4>
    <DateInput
      v-model="newUxEvent.date"
      v-bind="dateInputProps"
    />
    <h4 class="header -small">
      {{ $t('score') }}
    </h4>
    <input
      v-model="newUxEvent.score"
      type="number"
      min="-100"
      max="100"
      class="form -score"
    >
    <h4 class="header -small">
      {{ $t('description') }}
    </h4>
    <textarea
      v-model="newUxEvent.description"
      class="form -description"
    />
    <button
      type="button"
      class="button -blue"
      :disabled="!isNewUxEventReady"
      @click="finish"
    >
      {{ $t('create') }}
    </button>
    <button
      type="button"
      class="button -red"
      @click="$emit('finish')"
    >
      {{ $t('cancel') }}
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/types'
import DateInput from 'molecules/DateInput.vue'
import { isValid } from 'date-fns'

@Component({
  components: { DateInput },
  methods: {
    ...mapMutations(['addUxEvent'])
  }
})
export default class NewUxEvent extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  newUxEvent: UxEvent = this.createUxEvent()
  private addUxEvent!: (payload: UxEvent) => void

  get dateInputProps (): object {
    const { prevUxEvent, nextUxEvent } = this
    return {
      prevUxEvent,
      nextUxEvent
    }
  }

  get isNewUxEventReady (): boolean {
    return this.newUxEvent.date instanceof Date && isValid(this.newUxEvent.date)
  }

  createUxEvent (): UxEvent {
    return { date: {} as Date, score: 0, description: '' }
  }

  @Emit()
  finish (): void {
    this.addUxEvent(this.newUxEvent)
    this.newUxEvent = this.createUxEvent()
  }
}
</script>

<style scoped lang="sass">
</style>