$(function(){

  //发送ajax请求,渲染页面
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getbrandtitle',
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.t-category ul').html(template('tmp',info))
    }
  })
})