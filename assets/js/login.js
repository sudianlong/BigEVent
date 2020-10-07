$(function () {
    $('#link_reg').on('click', function () {
        // 点击 去 注册的a链接 登录的盒子隐藏 注册盒子显示
        $('.login-box').hide()
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show();
    });

    //  从layui中 获取  form 对象
    var form = layui.form

    var layer = layui.layer
    //  通过 form verfiy () 函数自定义校验规则
    form.verify({
        // 自定义个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        //  校验两次密码是否一致的规则
        repwd: function (value) {// value 用户输入的值 
            //  t通过形参拿到的时再次输入密码框的内容  判断此 与密码框内容进行判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })          

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: data,
            // dataType: "dataType",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功! ')
                // 模拟 自动点击行为
                $('#link_login').click()
            }
        });
    })

    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功! ')
                // console./log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
             
            }
        })
    })


})
