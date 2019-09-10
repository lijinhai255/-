$(function () {
    var tipNum = 20;
    var tpl = []
    for (var i = 0; i < tipNum; i++) {
        var str = [139, 138, 137, 136, 135, 134, 150, 151, 152, 157, 158, 159, 182, 183, 187, 188, 147, 130, 131, 132, 136, 185, 186, 145, 133, 153, 180, 189, 199, 198, 166, 177, 145, 149, 176, 175, 171]
        var xingshi = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
            "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
            "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
            "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
            "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
            "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
            "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
            "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
            "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
            "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"]
        var str1 = "";
        // phone 后
        str1 = Math.floor(Math.random() * 1000);
        // phone 前
        var num = str[Math.ceil(Math.random() * str.length - 1)]

        var xingshistr = xingshi[[Math.ceil(Math.random() * xingshi.length -1)]]

        var time = Math.ceil(Math.random() * 30)
        var money = Math.ceil(Math.random() * 10)
        tpl.push('<li>' + num + '***' + str1 + '，' + xingshistr + '**' + time + '分钟前成功借款' + money + '000元</li>')
        //dom 上树

    }
    tpl.push(tpl[0])
    $(".carousel_container").html(tpl);
    // var num1 = 100;
        var step = -28;
        var times = 996
    // if (num1 > 1) {
        setInterval(function () {
            $(".carousel_container").animate({
                top: "-2.33rem"
            }, 1000, function () {
                // console.log($(this).find("li:eq(0)"))
                $(this).find("li:eq(0)").appendTo(this);
            })
        //     times++
        //     // console.log(time, tipNum)
            // if( times >= tipNum){
            //     times = 0
            //     $(".carousel_container").css("transition",'none')
            //     $(".carousel_container").css("transform","translateY("+ step * times +"px)")
            // }else{
            //     times === 1 &&$(".carousel_container").css("transition",'all linear .5s')
            //     $(".carousel_container").css("transform","translateY("+ step * times +"px)")
            // }
        //     // $(".carousel_container").css("marginTop", step * times +"rem")
        }, 1000)
    // }
})