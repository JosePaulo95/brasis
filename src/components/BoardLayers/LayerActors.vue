<template>
  <div v-if="cell.value||1" :class="'actor cell-content '+cell.direction" >
    01
  </div>
</template>

<script lang="ts">
  import ActorLayerModel from '@/Brasis/models/ActorLayerModel';
  import { getBackgroundSprite } from '@/Brasis/views';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerActors',
    props: {
      cell: {
        type: ActorLayerModel,
        required: true
      },
    },
    methods: {
      getBackgroundSprite: getBackgroundSprite
    }
  });
</script>


<style scoped>
  :root {
    --i:1;
    --j:1;
  }
  .actor {
    background-image: url("../../assets/Knight/SpriteSheet.png");
    background-size: calc(100%*4);
    background-position: right calc(var(--i)*100%) bottom calc(var(--j)*100%);
    z-index: 3;
  }
  .walk-down {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: example;
  }
  @keyframes example {
    0% {--j: 1;}
    25% {--j: 2;}
    50% {--j: 3;}
    75% {--j: 4;}
  }
  .top {
    --i: 2;
    --j: 1;
  }
  .left {
    --i: 3;
    --j: 1;
  }
  .right {
    --i: 4;
    --j: 1;
  }
  .bottom {
    --i: 1;
    --j: 1;
  }
</style>
