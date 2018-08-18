$(function () {

  // 1.发送ajax请求,动态获取数据
  var width = 0;
  var titleid = 0;
  render();
  function render(titleid) {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
      dataType: 'json',
      data: {
        titleid: titleid || 0,
      },
      success: function (info) {
        console.log(info)
        $('.product-list ul').html(template('tmp', info))
      }
    })
  }

  /*
  * 1.渲染导航栏
  * 2.在渲染完成之后,动态回去ul的宽度
  * 3.计算出ul向左移动的最大值
  * 4.用touch事件记录移动的位置
  * 5.用一个变量接收移动过后的值,下次移动的时候要在原来移动过后的基础上加上move移动的距离
  * 就是最新移动后的距离;
  * 6.判断ul可移动的最大距离,如果超过最大距离就等于最大距离(ul可移动的距离都是负数)
  * 如果小于0就等于0;
  */
  //渲染导航
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType: 'json',
    success: function (info) {
      
      $('.cai-nav ul').html(template('navTmp', info))
    // 动态获取ul的宽度
      $('.cai-nav li').each(function (index, ele) {
        width += $(ele).width();
      });
        //设置ul的宽度
        $('.cai-nav ul').width(width);
        console.log(width);
        //5.点击li渲染不同的分页
      // 给被点击的类名加高亮
      $('.cai-nav ul').on('click', 'a', function () {
        titleid = $(this).data('id');
        $(this).addClass('current').parent().siblings().find('a').removeClass('current');
        render(titleid);
      })
        var ul = document.querySelector('.cai-nav ul');
        var nav = document.querySelector('.cai-nav');
        var start = 0;  //开始位置
        var move = 0;   //移动的位置
        var distance = 0;   //移动多少
        var ulLfet = 0;  // 移动后的位置
        var maxMove = 0;

        //计算出ul可以移动的最大宽度
        maxMove = width - $('.cai-nav').width();
        console.log(width);

        //用touch事件记录移动的位置
        nav.ontouchstart = function (e) {
          start = e.targetTouches[0].clientX;
        }
        nav.ontouchmove = function (e) {
          move = e.targetTouches[0].clientX;
          distance = move - start;
          ul.style.transform = 'translateX(' + (distance + ulLfet) + 'px)';
        }

        //在touch事件结束的时候,把移动的距离赋值给ul
        nav.ontouchend = function (e) {
          //记录移动结束的位置,
          ulLfet += distance;

          //判断ul可移动的范围
          // 向左移动移动就是负值;
          if (ulLfet < -maxMove ){
            ulLfet = -maxMove
          }
           if(ulLfet > 0) {
            ulLfet = 0;
           }
          ul.style.transform = 'translateX(' + ulLfet + 'px)';
          start = 0;  //开始位置
          move = 0;   //移动的位置
          distance = 0;   //移动多少
        }
    }
  })
      
})       
