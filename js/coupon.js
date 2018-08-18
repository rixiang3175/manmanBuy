$(function(){

  $.ajax({
    type: 'get',
    url : 'http://mmb.ittun.com/api/getcoupon',
    dataType : 'json',
    success : function(info){
       console.log(info);
       $('.mm-main ul').html(template('tmp', info))
    }
  })
})