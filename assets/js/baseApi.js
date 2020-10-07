
//  jquery的ajax 过滤器
// ajax
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})