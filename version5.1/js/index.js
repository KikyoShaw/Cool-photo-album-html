$(function () {
    var $li = $("#box li");

    for (var i = 0; i < $li.length; i++) {
        $li.eq(i).css("backgroundImage", "url(images/tu" + (i + 1) + ".jpg)");
    }

    //给所有的li注册鼠标经过事件
    $li.mouseenter(function () {
        $(this).stop().animate({ "width": "960px" }).siblings().stop().animate({ "width": "100px" });
    }).mouseleave(function () {
        $li.stop().animate({ "width": "272px" });
    });

});