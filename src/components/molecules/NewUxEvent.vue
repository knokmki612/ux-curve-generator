<template>
  <section class="new-ux-event ux-event">
    <h3 class="header">
      {{ $t('UxEvent.newEvent') }}
    </h3>
    <h4 class="header -small">
      {{ $t('UxEvent.date') }}
    </h4>
    <DateInput
      v-model="newUxEvent.date"
      v-bind="dateInputProps"
    />
    <h4 class="header -small">
      {{ $t('UxEvent.score') }}
    </h4>
    <div class="flex">
      <input
        v-model="newUxEvent.score"
        type="number"
        min="-100"
        max="100"
        :aria-label="$t('UxEvent.scoreNumberLabel')"
        class="form w-16"
      >
      <input
        v-model="newUxEvent.score"
        type="range"
        min="-100"
        max="100"
        :aria-label="$t('UxEvent.scoreRangeLabel')"
        class="rounded ml-2 flex-1"
      >
    </div>
    <h4 class="header -small">
      {{ $t('UxEvent.description') }}
    </h4>
    <textarea
      v-model="newUxEvent.description"
      :aria-label="$t('UxEvent.descriptionLabel')"
      class="form w-full"
    />
    <button
      type="button"
      class="button -cancel"
      @click="$emit('finish')"
    >
      {{ $t('UxEvent.cancel') }}
    </button>
    <button
      type="button"
      class="button -blue"
      :disabled="!isNewUxEventReady"
      @click="finish"
    >
      {{ $t('UxEvent.create') }}
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { mapMutations } from 'vuex'
import { UxEvent, RelativeDateInputProps } from '@/types'
import DateInput from 'molecules/DateInput.vue'
import { isValid } from 'date-fns'

@Component({
  components: { DateInput },
  methods: {
    ...mapMutations('UxEvents', ['addUxEvent'])
  }
})
export default class NewUxEvent extends Vue {
  @Prop(Object) readonly prevUxEvent: UxEvent | undefined
  @Prop(Object) readonly nextUxEvent: UxEvent | undefined
  addUxEvent!: (payload: UxEvent) => void
  newUxEvent: UxEvent = this.createUxEvent()

  get dateInputProps (): RelativeDateInputProps {
    const { prevUxEvent, nextUxEvent } = this
    return {
      prevUxEvent,
      nextUxEvent
    }
  }

  get isNewUxEventReady (): boolean {
    return isValid(new Date(this.newUxEvent.date))
  }

  createUxEvent (): UxEvent {
    return { score: 0, description: '', date: '' }
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
