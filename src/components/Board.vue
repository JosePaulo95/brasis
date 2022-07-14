  <template>
    <table class="board">
      <tbody>
        <tr class="row" v-for="(row, x) in board">
          <td class="cell" v-for="(cell, y) in row" :id="'cell-'+x+'-'+y">
            <img v-bind:src="getBackgroundSprite(cell)" alt="">
          </td>
        </tr>
      </tbody>
    </table>
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
    .board { border-spacing: 0; border-collapse: collapse; }
    .board th { padding: .5em; }
    .board td { border: 1px solid; width: 2em; height: 2em; }
    .board .light { background: #eee; }
    .board .dark { background: #000; }
  </style>
