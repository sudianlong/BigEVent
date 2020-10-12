$(function () {
    var layer = layui.layer
    
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            area: ['500px', '250px'],
            success: function (res) {
                // console.log(res);
                var hl = template('tpl-table', res)
                // console.log(hl);
                $('tbody').html(hl)
            }
        });
    }

    var indexAdd = null
    $('#addCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            // 在弹出层的 content 中渲染 html标签
            ,content: $('#dialog-add').html()
          });
    })

    // tongguo1  dail带代理的形式 
  
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        // alert(0)
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            // dataType: "dataType",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('新增分类失败! ')
                }
                layer.msg('新增分类成功! ')
                initArtCateList()
                // 关闭当前的弹出层
                // console.log(indexAdd);  1
                layer.close(indexAdd)
            }
        });
    })

    var indexEdit = null
    // 代理的形式 为btn-edit 绑定点击按钮
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            // 在弹出层的 content 中渲染 html标签
            ,content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            // data: "data",
            // dataType: "dataType",
            success: function (res) {
                // lay-filter="form-edit"
                form.val("form-edit",res.data)
            }
        });
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新分类数据失败! ')
                }
                layer.msg('更新分类数据成功! ')
                layer.close(indexEdit)
                initArtCateList()
            }
        });
    })

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除分类数据失败! ')
                    }
                    layer.msg('删除分类数据成功! ')
                    layer.close(index)
                    initArtCateList()
                }
            });
            
          });
    })
})