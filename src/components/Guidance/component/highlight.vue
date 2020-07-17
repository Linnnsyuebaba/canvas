<template>
  <div class="highlight">
    <canvas ref="canvas" class="canvas" />
    <button @click.stop="next">next</button>
    <!-- <button @click.stop="clearCanvas">reset canvas</button> -->
  </div>
</template>

<script>
const RECT = 1;
// const RECT_STACK_VERTICAL = 2;
// const RECT_STACK_TRANSVERSE = 3;
const COMPLEX = 4;

export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    context: null,
    currentStepIndex: 0,
    currentStep: {
      idList: [],
      location: [],
      tipDirection: '',
      msg: '',
    },
  }),
  created() {
    this.currentStepIndex = 0;
    this.changeCurrent();
  },
  mounted() {
    this.initCanvas();
    console.log(this.getNodePosition(this.currentStep.idList));
    this.drawDashRect();
  },
  methods: {
    initCanvas() {
      this.$refs.canvas.width = screen.availWidth;
      this.$refs.canvas.height = screen.availHeight;
      this.context = this.$refs.canvas.getContext('2d');
    },
    changeCurrent() {
      this.currentStep.msg = this.steps[this.currentStepIndex].msg;
      this.currentStep.idList = this.steps[this.currentStepIndex].idList;
      this.currentStep.tipDirection = this.steps[
        this.currentStepIndex
      ].tipDirection;
    },
    getNodePosition(nodeIdList, structure = RECT) {
      let nodePositionList = [];
      if (nodeIdList.length > 1) {
        nodePositionList = nodeIdList.map((nodeId) =>
          this.getOneNodePosition(nodeId)
        );
      } else {
        nodePositionList = this.getOneNodePosition(nodeIdList[0]);
      }
      switch (structure) {
        case RECT:
          this.currentStep.location = nodePositionList;
          break;
        case COMPLEX:
          this.currentStep.location = [
            nodePositionList[0][0],
            nodePositionList[0][1],
            [nodePositionList[0][1][0], nodePositionList[1][0][1]],
            nodePositionList[1][1],
            nodePositionList[1][2],
            nodePositionList[0][3],
          ];
          break;
      }
    },
    getOneNodePosition(nodeId) {
      let node = document.querySelector(nodeId);
      let { top, left, width, height } = node.getBoundingClientRect();
      return [
        [left, top],
        [left + width, top],
        [left + width, top + height],
        [left, top + height],
      ];
    },
    drawDashLine([x1, y1], [x2, y2], step = 8) {
      const x = x2 - x1,
        y = y2 - y1,
        count = Math.floor(Math.sqrt(x * x + y * y) / step),
        xv = x / count,
        yv = y / count;
      this.context.beginPath();
      for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
          this.context.moveTo(x1, y1);
        } else {
          this.context.lineTo(x1, y1);
        }
        x1 += xv;
        y1 += yv;
      }
      this.context.lineTo(x2, y2);
    },
    drawDashRect() {
      this.context.strokeStyle = '#3878FF';
      this.context.lineWidth = 3;
      this.currentStep.location.push(this.currentStep.location[0]);
      this.currentStep.location.reduce((prev, cur) => {
        this.drawDashLine(prev, cur);
        this.context.stroke();
        return cur;
      });
    },
    clearCanvas() {
      this.context.clearRect(0, 0, screen.availWidth, screen.availHeight);
    },
    next() {
      ++this.currentStepIndex;
      this.clearCanvas();
      this.changeCurrent();
      this.getNodePosition(this.currentStep.idList, COMPLEX);
      this.drawDashRect();
    },
  },
};
</script>

<style scoped>
.highlight {
  box-sizing: border-box;
}
.border {
  box-sizing: border-box;
  border: 2px solid blue;
  position: absolute;
}
button {
  position: absolute;
  top: 0;
}
</style>
