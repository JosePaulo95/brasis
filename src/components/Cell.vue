  <template>
    <td class="cell" :id="'cell-'+x+'-'+y">
        {{value}}
    </td>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Cell',
    props: {
      value: [String, Number],
      x: Number,
      y: Number
    },
  });
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .cell{
    background-color: blue;
  }
  </style>
