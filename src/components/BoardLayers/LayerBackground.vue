<template>
  <img class="cell-content" v-bind:src="getBackgroundSprite('bg', cell)" alt="" />
</template>

<script lang="ts">
  import { getBackgroundSprite } from '@/Brasis/views';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerBackground',
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
  
</style>
