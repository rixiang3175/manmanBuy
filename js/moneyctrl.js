$(function () {

  var pageTotal = 1;
  var pageId = 1;
  render();
  // 1.动态渲染商品
  function render(pageId) {
    $.ajax({
      type: 'get',
      url: 'http://mmb.ittun.com/api/getmoneyctrl',
      data: {
        pageid: pageId || 0,
      },
      dataType: 'json',
      success: function (info) {
        console.log(info)
        // console.log(template('indTmp',info))
        $('.pro-item ul').html(template('indTmp', info))

        //计算出总页数
        var size = info.pagesize;
        var total = info.totalCount;
        pageTotal = Math.ceil(total / size);
        console.log(pageTotal);

        //把分页的总数传给模板引擎,进行渲染
        $('.pro-page select').html(template('pageTmp', { pageTotal: pageTotal }));
        //渲染后立马保存状态,否则下面重新渲染会覆盖掉
        $('select option').eq(pageId).prop('selected', 'true');
      }
    })
  }

  // 点击按钮渲染上一页下一页
  $('.prev').click(function () {
    pageId--;
    if (pageId < 0) {
      pageId = 14;
    }

    //2.根据option的下标,改变下拉框的值
    $('select option').eq(pageId).prop('selected', 'true')
    render(pageId);
  })

  $('.next').click(function () {
    pageId++;
    if (pageId > pageTotal - 1) {
      pageId = 0;
    }
    $('select option').eq(pageId).prop('selected', 'true')
    render(pageId);
  })

  //  3.点击下拉框,根据下拉框里面option被选择的值,动态渲染上一页或者下一页
  $('select').on('change', function () {
    pageId = $("option:selected").val() -1 ;
    console.log(pageId);
    render(pageId);
  })
})