$(function(){
  var prductId = getSearch('productid');
  console.log(prductId)
 //发送ajax请求渲染页面
 $.ajax({
   type: 'get',
   url : 'http://127.0.0.1:9090/api/getdiscountproduct',
   data : {
     productid : prductId
   },
   dataType : 'json',
   success : function(info){
     console.log(info);
     $('.mm-main').html(template('proTmp',info))
   }
 })

})