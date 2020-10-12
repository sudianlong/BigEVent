// /my/article/list

$(function () {
  // 定义q的查询对象
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
  var q = {
    pagenum: 1, //  页码值
    pagesize: 2, //	每页显示多少条数据
    cate_id: "", // 文章分类的 Id
    state: "", //  文章的状态，可选值有：已发布、草稿
  };

  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);
    var y = dt.getFullYear();

    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }

  initTable();
  function initTable() {
    $.ajax({
      type: "get",
      url: "/my/article/list",
      data: q,
      // dataType: "dataType",
      success: function (res) {
        if (res.status != 0) {
          return layer.msg("获取文章列表失败! ");
        }
        //  使用模板引擎渲染页面的数据
        console.log(res);
        var hl = template("tpl-table", res);
        $("tbody").html(hl);
        // 调用渲染分页的方法
        renderPage(res.total);
      },
    });
  }

  //
  initCate();
  function initCate() {
    $.ajax({
      type: "get",
      url: "/my/article/cates",
      // data: "data",
      // dataType: "dataType",
      success: function (res) {
        if (res.status != 0) {
          return layer.msg("获取分类数据失败! ");
        }
        // layer.msg('获取分类数据陈工')
        var hl = template("tpl-cate", res);
        // console.log(hl);
        $("[name=cate_id]").html(hl);
        // 通知layui 重新选突然ui
        form.render();
      },
    });
  }

  //
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    q.cate_id = cate_id;
    q.state = state;
    console.log(q);
    initTable();
  });

  // 分页
  function renderPage(total) {
    // console.log(total);

    laypage.render({
      elem: "pageBox",
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, //  每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的页,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        // 回调函数.
        // 判断哪种方式触发 first 为true 是第二种
        //  分页发生切换的时候触发jump 回调
        // 触发jump的回调函数 点击页码
        // 2 , 调用了layui.page.render 触发jump
        //obj包含了当前分页的所有参数，比如：
        //   console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagenum = obj.curr;
        //  根据q 值重新渲染
        // 把最新的条目数 赋值给q的参数对象种
        q.pagesize = obj.limit;
        //首次不执行
        if (!first) {
          //do something
          initTable();
        }
      },
    });
  }

  $("tbody").on("click", ".btn-delete", function () {
    var len = $(".btn-delete").length;
    var id = $(this).attr("data-id");
    layer.confirm("确认删除? ", { icon: 3, title: "提示" }, function (index) {
      //do somethingaja

      $.ajax({
        type: "get",
        url: "/my/article/deletecate/" + id,
        // data: "data",
        // dataType: "dataType",
        success: function (res) {
          if (res.status != 0) {
            return layer.msg("删除文章失败! ");
          }
          layer.msg("删除文章成功! ");

          if (len === 1) {
            //
            // 页码值最小是1
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
          //  当前数据删除后 判断当前数据是否还有剩余数据 如若没有剩余的数据 则页码值-1
          //  如果没有剩余的数据了 让页码值-1 重新调用
        },
      });

      layer.close(index);
    });
  });



});
