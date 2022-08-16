  <template>
    <StatusMenu
      :controller="controller"
    />
    <div class="board-container">
      <table class="board">
        <tbody>
          <tr v-for="(row, x) in state.default_board">
            <td v-for="(cell, y) in row" :id="'cell-'+x+'-'+y">
              <div @click="clicked(x, y)" class="cell-container">
                <LayerBackground :cell="state.bg_board.at(x, y)" />
                <LayerActionSquare :cell="state.action_square_board.at(x, y)" />
                <LayerWalls :cell="state.walls_board.at(x,y)" />
                <LayerActors :cell="state.actors_board.at(x,y)" />
                <div class="cell-container">
                  {{x}}{{y}}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script lang="ts">
  import BoardModel from '../Brasis/models/BoardModel';
  import BoardController from '@/Brasis/controllers/BoardController'
  import { defineComponent, PropType } from 'vue';
  import StatusMenu from "./StatusMenu.vue"
  import LayerBackground from "./BoardLayers/LayerBackground.vue"
  import LayerActors from "./BoardLayers/LayerActors.vue"
  import LayerWalls from "./BoardLayers/LayerWalls.vue"
  import "../styles/actor_anim.scss"
  import "../styles/sprites.css"
  import "../styles/terrain-sprites.scss"
  import "../styles/wall-sprites.scss"
  import LayerActionSquare from "./BoardLayers/LayerActionSquare.vue"
  import AudioController from '@/Brasis/controllers/AudioController';

  export default defineComponent({
    name: 'Board',
    components: {
    LayerBackground,
    LayerActors,
    LayerActionSquare,
    LayerWalls,
    StatusMenu
},
    data(){
      return {
        controller: {} as BoardController,
        state: {} as BoardModel
      }
    },
    props: {
      model: {
        type: Object as PropType<BoardModel>,
        required: true
      },
      audio_controller: {
        type: Object as PropType<AudioController>,
        required: true
      },
    },
    beforeMount(){
      this.state = this.model
      this.controller = new BoardController(this.state, this.audio_controller)
    },
    methods: {
      clicked(x: number, y: number){
        this.controller.select(x, y)
      },
    }
  });
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .board-container {
      overflow: scroll;
      background-color: #000;
      height: 100vh;
      width: auto;
      display: flex;
    }
    .board {
      table-layout: fixed;
      border-spacing: 0;
      border-collapse: collapse;
      margin: auto;
    }
    .board th {
      padding: 0vw;
    }
    .board td {
      background-color: #eee;
      border: 1px solid rgba(0,0,0,0.3);
      padding: unset;
      width: min(50px, 13vw);
      height: min(50px, 13vw);
    }
    .cell-container {
      vertical-align: top;
      width: inherit;
      height: inherit;
    }
    .cell-container * {
      position: absolute;
      width: inherit;
      height: inherit;
      image-rendering: pixelated;
    }
    .board .light { background: #eee; }
    .board .dark { background: #000; }
  </style>
