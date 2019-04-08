<template>
  <div class="embed-code" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { FixedUxEvent, UxEvent } from '@/interfaces'

@Component({
  computed: {
    ...mapState(['expectedUx', 'actualUx', 'uxEvents'])
  }
})
export default class EmbedCode extends Vue {
}
</script>

<style scoped lang="sass">
.embed-code
  @apply rounded shadow-md px-6 py-4 bg-white
</style>
