$(function () {
  //  1.渲染页面
  var couponId = getSearch('couponId');
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getcouponproduct',
    type: 'get',
    data: {
      couponid: couponId
    },
    dataType: 'json',

    success: function (info) {
      console.log(info)
      $('.product-list ul').html(template('tmp', info))
    }
  })

  var index = 0;
  var url;
  // 2.事件委托点击li显示模态框
  $('.product-list ul').on('click', 'a', function () {
    // alert();
    // 弹出模态框
    $('.model').show();
    //拿到点击的那个下标
    index = $(this).data('index');
    var url = $(this).parent().find('img').attr('src');
    // 赋值给模态框的第一张
    $('.model img').attr('src', url);
  })
  //  点击切换上一张;
  $('.left').click(function () {
    index--;
    if (index < 0) {  
      alert('已经是第一张了');
      index = 0;
    }
      //  拿到所有的img的src,再根据下标把a里面指定的img的src取出来,
      // 把那一个src赋值给模态框里面的img
    url = $('.product-list ul').find('img').eq(index).attr('src');
    $('.model img').attr('src', url);
  })

  //  3.点击切换下一张
  $('.right').click(function () {
    index++;
      //  拿到所有的img的src,再根据下标把a里面指定的img的src取出来,
      // 把那一个src赋值给模态框里面的img
    url = $('.product-list ul').find('img').eq(index).attr('src');
    $('.model img').attr('src', url);
  })

})  