$(function(){

  // 1.渲染页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getcategorytitle',
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.cate ul').html(template('cateTmp',info))
    }
  })


  //2.点击渲染一级菜单
  $('.cate ul').on('click',' .title',function(){
    // 给li添加类名,切换箭头的角度
    $(this).parent().toggleClass('btn-left');
    var titleid = $(this).data('id');
    console.log(titleid);
    $.ajax({
      url : 'http://127.0.0.1:9090/api/getcategory',
      type : 'get',
      data : {
        titleid : titleid
      },
      dataType : 'json',
      success : function(info){
        console.log(info)
        $('.cate ul .child>ul').html(template('tmp',info))
      }
    })
  })


})