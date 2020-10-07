
//  jquery的ajax 过滤器
// ajax
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    // 统一为 有权限的接口设置headers接口  
    if (options.url.indexOf('/my') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一
    options.complete = function (res) {
        // responseJSON
        if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败! ') {
            // 清空localstroage  跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})