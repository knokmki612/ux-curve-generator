<template>
  <span class="relative-date-picker">
    <template v-if="isPrev">前より</template><template v-else>後より</template><input type="number"><select>
      <option>分</option>
      <option>時間</option>
      <option>日</option>
      <option>月</option>
      <option>年</option>
    </select><template v-if="isPrev">後</template><template v-else>前</template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { format, isValid } from 'date-fns'

@Component
export default class RelativeDatePicker extends Vue {
  @Prop(Date) readonly date: Date | undefined
  @Prop(Boolean) readonly isPrev: boolean | undefined
}
</script>

<style scoped lang="sass">
</style>
