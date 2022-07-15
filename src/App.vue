<template>
  <Board
    :bg_board="[
      [55,55,55],
      [55,55,55],
      [55,55,55],
    ]"
    :actors_board="[
      [0,0,2],
      [0,0,0],
      [0,1,0],
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
