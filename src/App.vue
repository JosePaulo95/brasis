<template>
  <Board
    :bg_board="[
      [55,55,55],
      [55,55,55],
      [55,55,55],
    ]"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './components/Board.vue';

export default defineComponent({
  name: 'App',
  components: {
    Board
  }
});
</script>

<style>

</style>
