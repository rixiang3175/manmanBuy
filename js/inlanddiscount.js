$ (function() {
  //动态渲染页面
  $.ajax({
     type : 'get',
     url : 'http://127.0.0.1:9090/api/getinlanddiscount',
     dataType :'json',
     success : function(info){
       console.log(info)
       $('.mm-main ul').html(template('tmp',info))
     }
  })
})