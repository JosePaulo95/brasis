<template>
  <div
    v-if="cell.value"
    :id="'actor-'+cell.id"
    :class="`actor cell-content ${cell.team} ${cell.character} ${cell.direction} ${cell.animation} ${cell.disabled?'disabled':''}`"
  >
  
  </div>
</template>

<script lang="ts">
  import ActorLayerModel from '@/Brasis/models/ActorLayerModel';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LayerActors',
    props: {
      cell: {
        type: ActorLayerModel,
        required: true
      },
    },
    data() {
      return {
        
      }
    }
  });
</script>

<style scoped>
  .actor {
    background-size: calc(100%*4);
    background-position: right calc(var(--i)*100%) bottom calc(var(--j)*100%);
    z-index: 4;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
  }
  .bottom {
    --i: 1 !important;
  }
  .top {
    --i: 2 !important;
  }
  .left {
    --i: 3 !important;
  }
  .right {
    --i: 4 !important;
  }
  .walking {
    animation-name: walk;
  }
  @keyframes walk {
    0% {--j: 1;}
    25% {--j: 2;}
    50% {--j: 3;}
    75% {--j: 4;}
  }
  .disabled {
    filter: brightness(0.65);
  }
</style>
