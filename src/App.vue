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
import { LevelModel } from './Brasis/models/LevelModel';
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
    const board = new BoardModel("5x5 w/ allies and enemies")
    this.board_model = board
    const audio_model = new AudioModel()
    this.audio_controller = new AudioController(audio_model)
    const p1 = new PlayerModel("teamA")
    const p2 = new PlayerModel("teamB")
    this.level_model = new LevelModel(board, p1, p2)

  }
});
</script>

<style>

</style>
