<template>
  <div class="content">
    <div class="header"
         id="header" ref="header">header</div>
    <div class="middle"
         ref="middle">
      <div class="left"
           ref="left"
           id="left">left</div>
      <div class="right"
           id="right">right</div>
    </div>
    <ul class="right-slide">
      <li class="item"
          id="item-1"></li>
      <li class="item"
          id="item-2"></li>
      <li class="item"
          id="item-3"></li>
      <li class="item"
          id="item-4"></li>
      <li class="item"
          id="item-5"></li>
      <li class="item"
          id="item-6"></li>
    </ul>
  </div>
</template>

<script>
import Draggabilly from 'draggabilly'
import Drag from '../commom/drag'
export default {
  name: 'HelloWorld',
  mounted () {
    new Draggabilly(this.$refs.left, {
      containment: this.$refs.middle
    })
    const drag =new Drag(this.$refs.header, {
      containment: 'body'
    })
    console.log(drag.position)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 20px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
.header {
  position: absolute;
  top: 100px;
  left: 50px;
  width: 90px;
  height: 162px;
  line-height: 162px;
  background-color: #ffbfbf;
  margin-bottom: 20px;
}
.middle {
  height: 90vh;
  display: flex;
  align-items: flex-end;
}
.left {
  width: 300px;
  height: 60vh;
  line-height: 80vh;
  background-color: blue;
}
.right {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: chartreuse;
  margin-left: 10px;
}
.right-slide {
  position: absolute;
  right: 20px;
  top: 200px;
}
.item {
  list-style: none;
  width: 50px;
  height: 50px;
  background-color: chartreuse;
  margin: 10px 0;
}
</style>
