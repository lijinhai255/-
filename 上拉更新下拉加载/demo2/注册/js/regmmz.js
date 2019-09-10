$(function () {
    window.onresize = function(){
        alert(123)
    }
    //定于变量 用于控制验证码
    var isLegalCode = false;
    var isClickButton = false;
    var phoneNum ,codeNum = '';
    var type_id = $("#type_id").val();
    //聚焦事件
    // $("#name").on("focus", function (e) {
    //     $("#name").removeClass("error")
    //     var value = e.target.value;
    // });
    // //检测身份证号
    // $("#id").on("focus", function (e) {
    //     $("#id").removeClass("error");
    //     var value = e.target.value;
    // });
    //检测手机号
    $("#phone").on("focus", function (e) {
        $("#phone").removeClass("error");
        // e.target.value="";
        var value = e.target.value;
    })
    $("#code").on("focus", function (e) {
        $("#code").removeClass("error");
        var value = e.target.value;
    })
    //input事件
    // $("#name").on("input", function (e) {
    //     $("#name").removeClass("error")
    //     var value = e.target.value;
    // });
    // //检测身份证号
    // $("#id").on("input", function (e) {
    //     $("#id").removeClass("error");
    //     var value = e.target.value;
    //     if(value.length>18){
    //         Toast("身份证格式不对", "#toast")
    //     }
    // });
    $("#code").on("focus",function(){
       $("#code").val("");
    })
    //检测手机号
    $("#phone").on("input", function (e) {
        $("#phone").removeClass("error");
        var value = e.target.value;
        phoneNum = value
        $("#nest_register").css({opacity: 0.5})
        if(codeNum.length===6&&phoneNum.length===11){
            $("#nest_register").css({opacity: 1})
        }
    })
    $("#message").on("input", function (e) {
        $("#message").removeClass("error");
        var value = e.target.value;
        codeNum =value;
        $("#nest_register").css({opacity: 0.5})
        if(codeNum.length===6&&phoneNum.length===11){
            $("#nest_register").css({opacity: 1})
        }
    })
    function verTifivate() {
        //获取用户相关信息
        // var nameValue = $("#name").val();//用户名 
        // var idValue = $("#id").val();//身份证号
        var phoneValue = $("#phone").val();//手机号
        var code = $("#code").val();
        var message = $("#message").val();
        //进行正则验证
        //     $("#name").addClass("error")
        //     Toast("用户名误请重新检查", "#toast")
        // } else if (idValue === "" || idValue === null) {
        //     $("#id").addClass("error")
        //     Toast("身份证格式不对", "#toast")
        // } else if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idValue)) {
        //     $("#id").addClass("error")
        //     Toast("身份证格式不对", "#toast")
        // } else 
        if (phoneValue === "" || phoneValue === null) {
            $("#phone").addClass("error");
            Toast("手机号不能为空请重新检查", "#toast")
        } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phoneValue)) {
            $("#phone").addClass("error");
            Toast("手机号有误请重新检查", "#toast")
            //所有input 字段 都合法后
        }else if (isClickButton) {
            nest_register();
            if (code === "" || code === null) {
                $("#code").addClass("error")
            } else if (code.length === 6) {
                //修改 按钮的样式
                //    $("#nest_register").css({backgroundColor: "#FFCE1C"});
               
                regist();
            }
        } else {
            isLegalCode = true;
            $(".getCode").css({ display: "block" })
            getCode();
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
            // setTimeout(() => {
            //     ele.style.display = 'none';
            // }, t ? t : 2000);
            setTimeout(function(){
                ele.style.display = 'none';
            }, 2000)
        } else {
            console.warn("param msg must be a String !");
        }
    }

    //获取验证码ajax
    function getCode() {
        $("#code").val("");
        var url = $("#imgUrl").val();
        $.ajax({
            type: 'get',
            'url': url+'/'+$("#phone").val(),
            success: function (data) {
                var img = data.img;
                var newImg = 'data:image/jpeg;base64,' + img
                if(type_id){
                    $(".getImg_left").css({ 'background-image': `url(${newImg})`, "background-repeat": "no-repeat", 'background-size': ' 2.4rem 0.88rem' })
                }else{
                   $(".getImg_left").css({ 'background-image': `url(${newImg})`, "background-repeat": "no-repeat", 'background-size': ' 10rem 3.67rem' })
                }
            },
            error: function () {
                //失败时的方法
            }
        },
        )
    }
    //进行 倒计时 的方法
    function timeDown() {
        if(type_id){
            //成功时的方法
        var timeflag = 60;
        var clock = setInterval(function () {
            if (timeflag > 0) {
                timeflag--;
                $(".get-code").addClass("get-code-wait")
                $(".get-code").html('重新发送(<i>'+timeflag+'</i>s)')
                 $(".code_btn").unbind();//取消事件
            } else {
                clearInterval(clock);
                $('.get-code').text('获取验证码');
                 $(".code_btn").bind('click',function(){
                    $("#code").removeClass("error")
                    isClickButton = false;
                    verTifivate();
            })
            }
        }, 1000)

        }else{
            //成功时的方法
        var timeflag = 60;
        isLegalCode = false;
        var clock = setInterval(function () {
            if (timeflag > 0) {
                timeflag--;
                $(".code_btn").css({paddingLeft:'0'})
                $(".get_code_text").text('重新发送('+timeflag + 's)')
                $(".code_btn").unbind();//取消事件
            } else {
                clearInterval(clock);
                time_flag = true;
                 $(".code_btn").bind('click',function(){
                    $("#code").removeClass("error")
                    isClickButton = false;
                    verTifivate();
            })
                $('.get_code_text').text('获取验证码')

            }
        }, 1000)

        }
        
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
    //获取验证码 点击事件
    $(".code_btn").bind("click",function(){
            $("#code").removeClass("error")
            isClickButton = false;
            verTifivate();
    })
    //注册事件
    $("#nest_register").click(function () {
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
        var mobile = $("#phone").val().trim();
        var code = $("#code").val().trim();
        $.ajax({
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "/register/sendsms" ,//url
            data: {'mobile':mobile,'code':code},
            success: function (data) {
                if(data.code==200){
                    Toast("验证码发送成功","#toast");
                    $(".getCode").css({ display: "none" });
                    timeDown();//倒计时开始
                }else{
                    Toast(data.message,"#toast");
                    //getCode();
                    return false;
                }
            },
        })
    })

    //$("#nest_register").click(function () {
    function nest_register(){
        var mobile = $("#phone").val().trim();
        var code = $("#code").val().trim();
        var message = $("#message").val().trim();
        var channel = $("#channel").val().trim();
        var openid = $("#openid").val().trim();
        var market_id = $("#market_id").val().trim();
        if (message === "" || message === null) {
            $("#phone").addClass("error");
            Toast("验证码不能为空请重新检查", "#toast")
            return;
        } 
        $.ajax({
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            //url: "vregistercheck" ,//url
            url: "register",
            data: {'mobile':mobile,'code':code,'message':message,'channel':channel,'openid':openid,'market_id':market_id,'type_id':type_id},
            success: function (data) {
                if(data.code==200){
                    window.location.href = data.url;
                }else{
                    Toast(data.message,"#toast");
                    getCode();
                    return false;
                }
            },
        })
    }

    /*$("#phone").on('input',function(){
        var mobile = $("#phone").val().trim();
        var channel = $("#channel").val().trim();
        var openid = $("#openid").val().trim();
        if(mobile.length === 11){
            $.ajax({
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "isusersupermarket" ,//url
                data: {'mobile':mobile,'openid':openid},
                success: function (data) {
                    if(data.code==1){
                        Toast(data.message,"#toast");
                        var url = "information?userSupermarketId="+data.userSupermarketId+"&type_id="+type_id;
                        setTimeout("window.location ='"+url+"'", 2000);  
                        return false;
                    }
                },
            })
        } 
    })*/

  

})