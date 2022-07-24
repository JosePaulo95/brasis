<template>
  <div :class="'actor cell-content'" >
    
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
    --i:1;
    --j:1;
    background-image: url("../../assets/Knight/SpriteSheet.png");
    background-size: calc(100%*4);
    background-position: right calc(var(--i)*100%) bottom calc(var(--j)*100%);
    z-index: 3;
  }
</style>
