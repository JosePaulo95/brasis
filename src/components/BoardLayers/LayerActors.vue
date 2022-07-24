<template>
  <div v-if="cell.value" :class="'actor cell-content'" >
    
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
  .actor {
    --i:0;
    --j:2;
    background-image: url("../../assets/Knight/SpriteSheet.png");
    background-size: calc(100%*4);
    background-position: left calc(var(--i)*100%) top calc(var(--j)*100%);
    z-index: 3; 
    /* --n:.5;
    --i:3; 
    --j:0; 

    background-image: url("../../assets/Knight/SeparateAnim/Idle.png");
    height:calc(16px / var(--n));
    width:calc(16px / var(--n));
    background-position:calc(var(--i)/var(--n) * 16px) calc(var(--j)/var(--n) * 16px);
    background-size:calc(64px / var(--n)) calc(16px / var(--n));
    */
  }
</style>
