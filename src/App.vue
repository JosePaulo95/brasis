<template>
  <Board :board="[
    [55,55,55,55,55,55,55],
    [55,56,55,55,55,55,55],
    [55,55,55,55,55,55,55],
    [56,0,1,2,55,55,55],
    [55,11,12,13,55,57,57],
    [55,11,12,13,55,55,55],
  ]"/>
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
