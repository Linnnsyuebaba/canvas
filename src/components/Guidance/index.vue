<template>
  <div class="guidance">
    <highlight :steps="steps" />
  </div>
</template>

<script>
import Highlight from './component/highlight';
export default {
  components: {
    Highlight,
  },
  data: () => ({
    steps: [
      {
        idList: ['#header'],
        tipDirection: 'bottom',
        msg: 'test',
      },
      {
        idList: ['#left', '#right'],
        tipDirection: 'bottom',
        msg: 'test',
      },
      {
        idList: ['item-1', 'item-2', 'item-3', 'item-4'],
      },
    ],
  }),
};
</script>

<style scoped>
.guidance {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
