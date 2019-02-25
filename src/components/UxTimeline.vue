<template>
  <div>
    <ul>
      <li
        v-for="(uxEvent, key) in uxEvents"
        :key="key"
      >
        <input
          :value="uxEvent.date"
          type="date"
          @input="updateUxEvent({
            key, value: { date: $event.target.value } })"
        >
        <input
          :value="uxEvent.score"
          type="number"
          min="-100"
          max="100"
          @input="updateUxEvent({
            key, value: { score: $event.target.value }
          })"
        >
        <textarea
          :value="uxEvent.description"
          @input="updateUxEvent({
            key, value: { description: $event.target.value }
          })"
        />
        <button
          type="button"
          @click="deleteUxEvent({ key })"
        >
          {{ $t("delete") }}
        </button>
      </li>
    </ul>
    <button
      type="button"
      @click="createUxEvent"
    >
      {{ $t("add") }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'

@Component({
  computed: {
    ...mapState(['uxEvents'])
  },
  methods: {
    ...mapMutations(['createUxEvent', 'updateUxEvent', 'deleteUxEvent'])
  }
})
export default class UxTimeline extends Vue {}
</script>

<style scoped lang="scss">
</style>
