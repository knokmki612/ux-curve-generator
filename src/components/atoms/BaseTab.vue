<template>
  <div
    class="base-tab"
    role="tablist"
  >
    <button
      v-for="(item, key) in tabItems"
      :key="key"
      class="tab"
      :class="{ '-active': isActive(key) }"
      type="button"
      role="tab"
      @click="input(key)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class BaseTab extends Vue {
  @Prop(Array) readonly tabItems!: string[]
  @Prop(Number) readonly value!: number

  isActive (key: number): boolean {
    return this.value === key
  }

  @Emit()
  input (key: number): number {
    return key
  }
}
</script>

<style scoped lang="sass">
.base-tab
  @apply whitespace-no-wrap

  > .tab
    @apply inline-block px-4 py-2 text-black bg-gray-400 cursor-pointer

    &:hover
      @apply bg-gray-500

    &.-active
      @apply text-white font-bold bg-blue-600

      &:hover
        @apply bg-blue-700

    &:first-child
      @apply rounded-l

    &:last-child
      @apply rounded-r
</style>
