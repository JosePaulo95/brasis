<template>
  <img class="cell-content transparent" v-bind:src="getBackgroundSprite('board-hud', cell)" alt="" />
</template>

<script lang="ts">
  import { getBackgroundSprite } from '@/Brasis/views';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerHUD',
    props: {
      cell: {
        type: Number,
        required: true
      },
    },
    methods: {
      getBackgroundSprite: getBackgroundSprite
    }
  });
</script>


<style scoped>
  .transparent {
    opacity: 0.5;
  }
</style>
