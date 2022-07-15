<template>
  <Board
    :state="this.state"
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
      state: {}
    }
  },
  beforeMount(){
    this.state = new BoardModel()
  }
});
</script>

<style>

</style>
