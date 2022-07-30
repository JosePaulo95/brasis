<template>
  <Board
    :model="this.board_model"
    :audio_controller="this.audio_controller"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './components/Board.vue';
import BoardModel from './Brasis/models/BoardModel'
import AudioModel from './Brasis/models/AudioModel';
import AudioController from './Brasis/controllers/AudioController';

export default defineComponent({
  name: 'App',
  components: {
    Board
  },
  data(){
    return {
      board_model: {},
      audio_controller: {}
    }
  },
  beforeMount(){
    this.board_model = new BoardModel("5x5 w/ 2 allies")
    const audio_model = new AudioModel()
    this.audio_controller = new AudioController(audio_model)
  }
});
</script>

<style>

</style>
