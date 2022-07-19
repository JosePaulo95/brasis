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
                <LayerBackground :cell="state.bg_board[x][y]" />
                <LayerHUD :cell="state.hud_board[x][y]" />
                <LayerActors :cell="state.actors_board[x][y]" />
                <!-- <img class="cell-content" v-bind:src="getBackgroundSprite('bg', cell)" alt="">
                <img class="cell-content transparent" v-bind:src="getBackgroundSprite('board-ui', ui_board?ui_board[x]?ui_board[x][y]:0:0)" alt="">
                <img class="cell-content" v-bind:src="getBackgroundSprite('actors', actors_board?actors_board[x]?actors_board[x][y]:0:0)" alt=""> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script lang="ts">
  import BoardModel from '@/Brasis/models/board';
  import BoardController from '@/Brasis/controllers/board'
  import { defineComponent, PropType } from 'vue';
  import StatusMenu from "./StatusMenu.vue"
  import LayerBackground from "./BoardLayers/LayerBackground.vue"
  import LayerActors from "./BoardLayers/LayerActors.vue"
  import LayerHUD from "./BoardLayers/LayerHUD.vue"


  export default defineComponent({
    name: 'Board',
    components: {
    LayerBackground,
    LayerActors,
    LayerHUD,
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
      }
    },
    beforeMount(){
      this.state = this.model
      this.controller = new BoardController(this.state)
    },
    methods: {
      clicked(x: number, y: number){
        //const new_state = this.controller.select(x, y)
        this.controller.select(x, y)
        //this.state = this.controller.model
        //{}//new_state
        // if(this.actors_board && this.actors_board[x] && this.actors_board[x][y]){
          
        //   this.ui_board[x+1][y] = 1
        // }
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
