  <template>
    <div class="board-container">
      <table class="board">
        <tbody>
          <tr v-for="(row, x) in bg_board">
            <td v-for="(cell, y) in row" :id="'cell-'+x+'-'+y">
              <!-- <img class="cell-content" v-bind:src="getBackgroundSprite('bg', cell)" alt=""> -->
              <div class="cell-container">
                <img class="cell-content" v-bind:src="getBackgroundSprite('bg', cell)" alt="">
                <img class="cell-content" v-bind:src="getBackgroundSprite('actors', actors_board?actors_board[x]?actors_board[x][y]:0:0)" alt="">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { getBackgroundSprite } from '@/Brasis/views';

  export default defineComponent({
    name: 'Board',
    props: {
      bg_board: Array,
      actors_board: Array,
    },
    methods: {
      getBackgroundSprite: getBackgroundSprite,
      hello(x: number, y: number){
        alert("clicou no "+x+", "+y)
      }
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
    .cell-content {
      position: absolute;
      width: inherit;
      height: inherit;
    }
    .board .light { background: #eee; }
    .board .dark { background: #000; }
  </style>
