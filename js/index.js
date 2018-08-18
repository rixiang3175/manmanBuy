$(function(){
    
  // 1.动态渲染导航
  $.ajax({
    type: 'get',
    url : 'http://127.0.0.1:9090/api/getindexmenu',
    dataType:'json',
     success : function(info){
       console.log(info)
       $('.mm-nav ul').html(template('navTmp',info))
       for (var i = 8; i <= 11; i++){
        //  给每一i加类名
        $('.mm-nav ul').find('li').eq(i).addClass('item-display');
        $('.mm-nav ul').find('li').eq(i - 1).click(function(){
          $(this).siblings('.item-display').toggle();
        })
       }
     }

  })

  //  2.点击更多切换隐藏的类名
   

  // 3.动态渲染商品
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getmoneyctrl',
    dataType : 'json',
    success : function( info ){
      console.log(info)
      // console.log(template('indTmp',info))
      $('.pro-item ul').html(template('indTmp',info))
    }
  })
})