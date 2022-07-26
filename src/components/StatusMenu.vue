<template>
  <span :class="controller.interaction_on?'transparent':''">
    🚫
  </span>
</template>

<script lang="ts">
import board from "@/Brasis/controllers/board";
import { PropType } from "@vue/runtime-dom";

export default {
  name: 'StatusMenu',
  props: {
    controller: Object as PropType<board>
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .transparent {
        opacity: 0.2;
    }
</style>
