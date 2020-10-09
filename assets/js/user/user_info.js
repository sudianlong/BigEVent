$(function () {
    var form = layui.form

    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称必须在1 ~ 6 个字符长度之间"
            }
        }
    });

    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败! ')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的 数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
})

    // 修改 用户的信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data : data,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新信息失败! ')
                }
                // initUserInfo()
                // 这是ifime的 内容 调用父页面中的方法 重新渲染用户的头像和用户的信息
                layer.msg('更新用户信息成功! ')
                window.parent.getUserInfo();
            }
        })
    })

