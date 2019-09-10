$(function () {
    //定于变量 用于控制验证码
    let isLegalCode = false;
    let isClickButton = false;
    let nam ='';
    //聚焦事件
    $("#name").on("focus", function (e) {
        $("#name").removeClass("error")
        var value = e.target.value;
    });
    //检测身份证号
    $("#id").on("focus", function (e) {
        $("#id").removeClass("error");
        var value = e.target.value;
    });
    //检测手机号
    // $("#phone").on("focus", function (e) {
    //     $("#phone").removeClass("error");
    //     e.target.value="";
    //     var value = e.target.value;
    // })
    // $("#code").on("focus", function (e) {
    //     $("#code").removeClass("error");
    //     var value = e.target.value;
    // })
    //input事件
    $("#name").on("input", function (e) {
        $("#name").removeClass("error")
        var value = e.target.value;
        nam =value;
    });
    //检测身份证号
     //检测身份证号
     $("#id").on("input", function (e) {
        $("#id").removeClass("error");
        var idValue = e.target.value.trim();
        // console.log(value.length,"11111")
        if(
            ((/^[1-9]\d{5}(18|19|(2\d)|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idValue)) ||
            (/^[1-9]\d{5}\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(idValue)) ) && (nam > 0 && nam < 65)){
            $("#submit").css({opacity: 1})
        }else {
            $("#submit").css({opacity: .5})
        }
    });
    // //检测手机号
    // $("#phone").on("input", function (e) {
    //     $("#phone").removeClass("error");
    //     var value = e.target.value;
    //     if(value.length>11){
    //         Toast("手机号长度超过了11位", "#toast")
    //     }
    // })
    // $("#code").on("input", function (e) {
    //     $("#code").removeClass("error");
    //     var value = e.target.value;
    // })
    function verTifivate() {
        //获取用户相关信息
        let nameValue = $("#name").val().trim();//用户名 
        let idValue = $("#id").val().trim();//身份证号
        // let phoneValue = $("#phone").val();//手机号
        // let code = $("#code").val();
        // console.log(nameValue, idValue)
        //进行正则验证
        if ( !nameValue || nameValue.length == 0 || nameValue.length > 65 ) {
            $("#name").addClass("error")
            Toast("用户名有误请重新检查", "#toast")
        } else if (
            (!/^[1-9]\d{5}(18|19|(2\d)|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idValue)) &&
            (!/^[1-9]\d{5}\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(idValue)) 
        ) {
            $("#id").addClass("error")
            Toast("身份证格式不对", "#toast")
        } 

    }
     // toast 提示
    function Toast(msg, el, t) {
        var ele = document.querySelector(el);
        var Ospan = ele.querySelector('span')
        // console.log(ele,Ospan)
        if (typeof msg === 'string') {
            Ospan.innerHTML = msg;
            ele.style.display = 'block';
            setTimeout(() => {
                ele.style.display = 'none';
            }, t ? t : 2000);
        } else {
            console.warn("param msg must be a String !");
        }
    }

    //获取验证码ajax
    function getCode() {
        $.ajax({
            type: 'post',
            url: 'https://www.easy-mock.com/mock/5d1ac5765cf87e56a47b23f8/example/getCode',
            data: {
                // name: $("#name").val(),//用户名 
                // id: $("#id").val(),
                phone: $("#phone").val()
            },
            success: function (data) {
                let { img } = data.data;
                let newImg = 'data:image/jpeg;base64,' + img
                console.log(img)
                $(".getImg_left").css({ 'background-image': `url(${newImg})`, "background-repeat": "no-repeat", 'background-size': ' 10rem 3.67rem' })

            },
            error: function () {
                //失败时的方法
            }
        },
        )
    }
    //进行 倒计时 的方法
    function timeDown() {
        //成功时的方法
        var timeflag = 60;
        isLegalCode = false;
        var clock = setInterval(function () {
            if (timeflag > 0) {
                timeflag--;
                $(".code_btn").text(timeflag + 's')
            } else {
                clearInterval(clock);
                time_flag = true;
                $('.code_btn').text('获取验证码')
            }
        }, 1000)
    }
    //进行注册的ajax
    function regist() {
        $.ajax({
            type: 'get',
            url: '/regist',
            data: {
                name: $("#name").val(),//用户名 
                id: $("#id").val(),
                phone: $("#phone").val(),
                code: $("#code").val()
            },
            success: function () {
                //注册成功进行页面跳转
            window.location.replace("/complateInforMation.html")
            },
            error: function () {
                //失败时的方法
            window.location.replace("/complateInforMation.html")
            }
        },
        )
    }
    //获取验证码 点击事件
    $(".code_btn").click(function () {
        $("#code").removeClass("error")
        isClickButton = false;
        verTifivate();
    });
    //注册事件
    $("#submit").click(function () {
        console.log("点击了")
        isClickButton = true;
        verTifivate();
        //获取数据
        //发送ajax 成功跳转到第三方平台
        //
        //获取验证码

    })
    //图片刷新事件
    $(".getImg_right").click(function () {
        getCode()
    })
    //取消事件
    $(".footer_left").click(function () {
        $(".getCode").css({ display: "none" })
    });

    //验证 验证码
    $(".footer_right").click(function () {
        $(".getCode").css({ display: "none" });
        timeDown();//倒计时开始
        console.log("可以去验证认证码了")
    })

})