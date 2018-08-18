$(function(){
  // 1.渲染第一屏品牌
  var brandtitleid = getSearch('brandtitleid');
  var brandname = getSearch('brandname');
  $('.hot .c-name').text(brandname.replace('十大品牌','') + '哪个牌子好! ')
    $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getbrand',
    data : {
      brandtitleid : brandtitleid,
    },
    dataType : 'json',
    success : function(info){
      console.log(info);
      $('.t-category ul').html(template('tmp1',info));
    }
  })
   

  //2.渲染销量
  $('.hot .c-num').text(brandname.replace('十大品牌','') + '产品销量排行! ')
  $.ajax({
    type : 'get',
    url : 'http://127.0.0.1:9090/api/getbrandproductlist',
    data : {
      brandtitleid : brandtitleid,
      pagesize : 4,
    },
    dataType : 'json',
    success : function(info){
      console.log(info)
      $('.brand-num ul').html(template('tmp2',info));
      //获取产品的图片赋值给评论
      var url = $('.brand-num li:nth-child(1)').find('img').attr('src');
      //获取产品的描述赋值给评论
      var des = $('.brand-num li:nth-child(1)').find('.des').text();
      //拿到产品的id的传递给后台
      var productId = $('.brand-num li:nth-child(1)').find('a').data('productid');
      console.log(productId);

      // ajax是异步的,所以要等产品渲染成功之后执行评论的渲染;
      // 3.渲染评论
      $.ajax({
        type : 'get',
        url : 'http://127.0.0.1:9090/api/getproductcom',
        data : {
          productid : productId
        },
        dataType : 'json',
        success : function(info){
          console.log(info);
          $('.hot .c-com').text(brandname.replace('十大品牌','') + '新评论! ')
          $('.comment').html(template('tmp3',info));
          $('.left').find('img').attr('src',url);
          $('.right1').find('p').text(des);
        }
      })
    }
  })

  
  
})