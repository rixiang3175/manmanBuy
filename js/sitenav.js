$(function(){
  
  //发送ajax请求渲染数据
  $.ajax({
    url : 'http://127.0.0.1:9090/api/getsitenav',
    get : 'get',
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.pro-link').html(template('tmp',info))
    }
  })



})