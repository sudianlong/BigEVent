// getUserInfo();

$(function () {
    var layer = layui.layer
    getUserInfo();

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录? ', { icon: 3, title: '提示' },
            function (index) {
            //do something
                location.href = '/login.html'
                localStorage.removeItem('token')
            //  关闭询问框
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
            // console.log(res.data);
        },
        // complete: function (res) {
        //     // responseJSON
        //     if (res.responseJSON == 1 && res.message === '身份认证失败! ') {
        //         // 清空localstroage  跳转到登录页面
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//
function renderAvatar(user) {

    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        console.log(first);
        $('.text-avatar').html(first).show()
    }
}