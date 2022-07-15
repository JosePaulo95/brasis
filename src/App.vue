<template>
  <Board
    :model="this.board_model"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './components/Board.vue';
import BoardModel from '@/Brasis/models/board'

export default defineComponent({
  name: 'App',
  components: {
    Board
  },
  data(){
    return {
      board_model: {}
    }
  },
  beforeMount(){
    this.board_model = new BoardModel()
  }
});
</script>

<style>

</style>
