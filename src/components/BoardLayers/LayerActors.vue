<template>  
  <div
    v-if="cell.value"
    :id="'actor-'+cell.id"
    :class="`cell-content actor ${cell.team} ${cell.character} ${cell.direction} ${cell.animation} ${cell.disabled?'disabled':''}`"
  >
  </div>
  <div
    v-if="cell.animation=='attacking'"
    :id="'weapon-'+cell.id"
    :class="`cell-content weapon sword`"
  >
  </div>

  <div
    v-if="cell.value"
    :class="`cell-content life-indicator`"
  >
    {{cell.life}}{{cell.discount_str}}
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
  .weapon {
    display: none;
    margin-left: 1rem;
    margin-bottom: 1rem;
    z-index: 5;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .life-indicator {
    font-size: 2rem;
    z-index: 6;
    font-weight: bold;
    font-family: monospace;
    color: white;
    text-shadow: 0rem 0.2rem black;
    white-space: nowrap;
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
  .attacking {
    animation-name: attack;
  }
  .dodging {
    animation-name: dodge;
  }
  .getting-hitted{
    animation-name: get-hit;
  }

  @keyframes walk {
    0% {--j: 1;}
    25% {--j: 2;}
    50% {--j: 3;}
    75% {--j: 4;}
  }
  @keyframes attack {
    0% {--j: 5;}
    100% {--j: 5;}
  }
  @keyframes dodge {
    0% {--i: 4; --j: 7;}
    100% {--i:4; --j: 7;}
  }
  @keyframes get-hit {
    0% {--j: 6;}
    100% {--j: 6;}
  }
  .disabled {
    filter: brightness(0.65);
  }
</style>
