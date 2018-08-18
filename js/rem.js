function setRem() {
  var rate = 100/640; 
  //获取当前屏幕，宽度
  var width = document.documentElement.clientWidth;  //获取浏览器可视区域宽
  console.log(width);
  //如果屏幕宽度大于640 , 就按照640宽度来处理
  if(width > 640) {
      width = 640;
  }
  //根据当前屏幕宽度，计算出当前屏幕rem的值
  document.querySelector('html').style.fontSize = width * rate + 'px';
}

//页面打开时是理解计算一下rem的值
setRem();
//当窗口尺寸变化时，动态计算rem的值
window.onresize = function () {
  setRem();
}