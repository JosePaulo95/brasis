<template>
  <Board
    :model="this.board_model"
    :audio_controller="this.audio_controller"
    :level_model="this.level_model"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './components/Board.vue';
import BoardModel from './Brasis/models/BoardModel'
import AudioModel from './Brasis/models/AudioModel';
import AudioController from './Brasis/controllers/AudioController';
import { PlayerModel } from './Brasis/models/PlayerModel';

export default defineComponent({
  name: 'App',
  components: {
    Board
  },
  data(){
    return {
      board_model: {},
      audio_controller: {},
      level_model: {}
    }
  },
  beforeMount(){
    const board = new BoardModel("4x4 x1 with obstacles and units")
    this.board_model = board
    const audio_model = new AudioModel()
    this.audio_controller = new AudioController(audio_model)
    const p1 = new PlayerModel("teamA")
    const p2 = new PlayerModel("teamB")
  }
});
</script>

<style>

</style>
