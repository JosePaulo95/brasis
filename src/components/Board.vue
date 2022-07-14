  <template>
    <div class="board-container">
      <table class="board">
        <tbody>
          <tr v-for="(row, x) in board">
            <td v-for="(cell, y) in row" :id="'cell-'+x+'-'+y">
              <img class="cell-content" v-bind:src="getBackgroundSprite(cell)" alt="">
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
      board: Array
    },
    methods: {
      getBackgroundSprite: getBackgroundSprite
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
      border-spacing: 0;
      border-collapse: collapse;
      margin: auto;
    }
    .board th {
      padding: 0vw;
    }
    .board td {
      background-color: white;
      border: 1px solid rgba(0,0,0,0.3);
      padding: unset;
      width: 13vw;
      height: 13vw;
    }
    .cell-content {
      vertical-align: top;
      width: inherit;
    }
    .board .light { background: #eee; }
    .board .dark { background: #000; }
  </style>
