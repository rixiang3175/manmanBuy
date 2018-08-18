$(function(){
  // 1.1号店下拉框
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getgsshop',
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.child.one ul').html(template('tmp', info));
    }
  })

  // 2.华北地区下拉框
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getgsshoparea',
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.child.two ul').html(template('tmp1', info));
      // setClick();
    }
  })
 
  //  3.渲染页面
  var shopid;
  var areaid;
  render();
  function render(shopid, areaid) {
    $.ajax({
      type : 'get',
      url : 'http://127.0.0.1:9090/api/getgsproduct',
      dataType : 'json',
      data : {
        shopid : shopid || 0, 
        areaid : areaid || 0,
      },
      success : function(info){
        console.log(info)
        $('.content ul').html(template('tmp2',info))
      }
    })
  }
  

    // 4.点击导航栏,切换显示的二级菜单
      $('.nav li').click(function(){
        //获取当前li的下标
        var index = $(this).index();
        //  根据下标切换二级菜单的隐藏和显示,让其他带child的兄弟元素隐藏
        //拿到所有带有child类名的盒子;
        $('.child').eq(index).toggle().siblings('div.child').hide();
      })
    
     
    // 5.点击店铺拿到店铺的id,
    //   给被选中的li添加高亮,
    //   隐藏二级菜单
    //   把当前li的值赋值给一级导航
    $('.child.one').on('click','li',function(){
      //获取商品id
      shopid = $(this).data('shopid');
      //添加高亮
      $(this).addClass('current').siblings().removeClass('current');
      // 赋值
      var txt = $(this).text();
      $('.nav .link1').text(txt);
      // 重新渲染
      render(shopid,areaid);
      // 关闭二级菜单
      $('.child').hide();
    })

    // 6.点击店铺拿到店铺的id,
    //   给被选中的li添加高亮,
    //   隐藏二级菜单
    //   把当前li的值赋值给一级导航
    $('.child.two').on('click','li',function(){
    //获取商品id
      areaid = $(this).data('areaid');
      //添加高亮
      $(this).addClass('current').siblings().removeClass('current');
      // 赋值
      var txt = $(this).text().trim().substr(0,2);
      $('.nav .link2').text(txt);
      // 重新渲染
      render(shopid,areaid);
      // 关闭二级菜单
      $('.child').hide();
  })


  // $('.child').on('click','li',function(){
    //   var index = $(this).index();
    //   var index1 = $(this).index();
    //   shopid = $('.child.one .link').eq(index).data('shopid');
    //   areaid = $('.child.two .link').eq(index).data('areaid');
    //   // console.log(areaid);
    //   // console.log(shopid);
    //   //给选中的店铺和地区设置高亮
    //   $(this).addClass('current').siblings('li').removeClass('current');
    //   //拿到二级菜单里面li的值,赋值给导航栏
    //   var txt1 = $('.child.one li').eq(index).text();
    //       $('.nav .link1').text(txt1);
    //   var txt2 = $('.child.two li').text().trim();
    //       txt2 = txt2.substr(0,2);
    //       console.log(txt2)
    //       $('.nav .link2').text(txt2);
      
    //   // var txt3 = $('.child.three li').eq(index).text();
    //   //      $('.nav .link3').text(txt3);
    //    //重新渲染
    //   render(shopid,areaid);
    //   // 关闭二级菜单
    //   $('.child').hide();
      
    // })
    
})

