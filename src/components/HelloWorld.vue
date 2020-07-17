<template>
  <div class="content">
    <div class="header" id="header">header</div>
    <div class="middle">
      <div class="left" id="left">left</div>
      <div class="right" id="right">right</div>
    </div>
    <ul class="right-slide">
      <li class="item" id="item-1"></li>
      <li class="item" id="item-2"></li>
      <li class="item" id="item-3"></li>
      <li class="item" id="item-4"></li>
      <li class="item" id="item-5"></li>
      <li class="item" id="item-6"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {},
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
  width: 100%;
  height: 162px;
  line-height: 162px;
  background-color: #ffbfbf;
  margin-bottom: 20px;
}
.middle {
  display: flex;
  align-items: flex-end;
}
.left {
  width: 300px;
  height: 70vh;
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
  top: 300px;
}
.item {
  list-style: none;
  width: 50px;
  height: 50px;
  background-color: chartreuse;
  margin: 10px 0;
}
</style>
