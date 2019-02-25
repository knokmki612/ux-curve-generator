<template>
  <ul>
    <li
      v-for="(uxEvent, key) in uxEvents"
      :key="key"
    >
      <span>{{ uxEvent.date }}</span>
      <span>{{ uxEvent.score }}</span>
      <span>{{ uxEvent.description }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState(['uxEvents'])
  }
})
export default class UxCurve extends Vue {}
</script>

<style scoped lang="scss">
</style>
