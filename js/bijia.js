$(function(){
 var productid = getSearch('productid');
//  console.log(productid);
  //1.渲染面包屑导航
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getproduct',
    data: {
      productid : productid,
    },
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.product-bijia').html(template('navTmp',info))
    }
  })

  // 2.渲染评论
  $.ajax({
    type:'get',
    url : 'http://127.0.0.1:9090/api/getproductcom',
    data : {
      productid : productid,
    },
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.note-conter ul').html(template('noteTmp',info))
    }
  })

})