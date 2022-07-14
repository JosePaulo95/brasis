  <template>
      <h1>{{ msg }}</h1>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Board',
    props: {
      msg: String,
    },
  });
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
