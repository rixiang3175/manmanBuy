$(function(){
  //拿到地址栏里面categoryid的id
 var categoryid = getSearch('categoryid');
 console.log(categoryid);
  // 1.渲染面包屑导航
  $.ajax({
    type : 'get',
    url :'http://127.0.0.1:9090/api/getcategorybyid',
    data : {
    categoryid : categoryid,
    },
    dataType : 'json',
    success : function(info){
      // console.log(info);
      $('.nav-list').html(template('nav-tmp',info))
    }
  })
  render()
//  2.进入页面就渲
 var pageTotal = 1;
  function render(pageId){
    $.ajax({
      type : 'get',
      url :'http://127.0.0.1:9090/api/getproductlist',
      data : {
        categoryid  : categoryid,
        pageid : pageId || 1,
      },
      dataType :'json',
      success : function(info){
        // console.log(info);
        $('.product-list ul').html(template('pro-list-tmp',info))
        var size = info.pagesize;
        var total = info.totalCount;

        //总页数
        pageTotal = Math.ceil(total / size )
            console.log(pageTotal);
           //模板引擎动态渲染option
       $('.pro-page select').html(template('optionTmp',{pageTotal : pageTotal}));
        //由于下面会重新渲染一次,所以在渲染之后立即再保存一下当前被选中的option
       $('select option').eq(pageId - 1).prop('selected',true);
      }
    })
  }

  var pageId = 1;
  //点击上一页渲染上一页的数据
  $('.prev').click(function(){
    pageId--;
    if (pageId < 1){
      pageId = pageTotal;
    }

    // $('select option').eq(pageId - 1).prop('selected',true);
    render(pageId);
  })
  
  //点击下一页渲染下一页的数据
  $('.next').click(function(){
    pageId++;
    if (pageId > pageTotal-1){
      pageId = 1;
    }
    // 根据pageId的值,判断option的下边,给对应的option被选中
    // $('select option').eq(pageId - 1).prop('selected',true);
    render(pageId);
  })


  //用change事件点击下拉框,渲染下一页或上一页
  // 拿到被选中的option的值 ,赋值给pageId
  $('select').on('change',function(){
     pageId = $("option:selected").val();
     render(pageId);
  })
})