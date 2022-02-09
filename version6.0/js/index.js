window.onload = function () {
    var wrap = document.getElementById('wrap');
    var arrow = document.getElementById('arrow');
    var slide = document.getElementById('slide');
    var ul = slide.children[0];
    // 鼠标经过轮播图，箭头缓缓出现
    wrap.onmouseenter = function () {
        arrow.style.opacity = 1;
    };
    // 鼠标离开轮播图，箭头缓缓消失
    wrap.onmouseleave = function () {
        arrow.style.opacity = 0;
    };
    // 生成ul>li
    for (var i = 0; i < 5; i++) {
        var li = document.createElement('li');
        li.style.backgroundImage = 'url("images/tu' + (i + 1) + '.jpg")';
        ul.appendChild(li);
    }

    // 设置图片位置
    var config = [
        {
            "width": 320,
            "height": 180,
            "top": 0,
            "left": 100,
            "opacity": 0.4,
            "zIndex": 2
        },
        {
            "width": 640,
            "height": 360,
            "top": 100,
            "left": 0,
            "opacity": 0.8,
            "zIndex": 3
        },
        {
            "width": 800,
            "height": 450,
            "top": 150,
            "left": 280,
            "opacity": 1,
            "zIndex": 4
        },
        {
            "width": 640,
            "height": 360,
            "top": 100,
            "left": 740,
            "opacity": 0.8,
            "zIndex": 3
        },
        {
            "width": 320,
            "height": 180,
            "top": 0,
            "left": 960,
            "opacity": 0.4,
            "zIndex": 2
        },
    ];

    LocationChange();

    var arrLeft = document.getElementById('arrLeft');
    var arrRight = document.getElementById('arrRight');
    var flag = true;    //添加节流阀

    // 左箭头点击事件
    arrLeft.onclick = function () {
        if (flag === true){
            flag = false;
            config.push(config.shift());
            LocationChange();
        }
    }

    //右箭头点击事件
    arrRight.onclick = function () {
        if (flag === true){
            flag = false;
            config.unshift(config.pop());
            LocationChange();
        }
    }

    // 让所有的图片以动画的形式到达指定的位置
    function LocationChange() {
        for (var i = 0; i < ul.children.length; i++) {
            this.animate(ul.children[i], config[i], function(){
                flag = true;    
            });
        }
    }

    setInterval(arrRight.onclick,3000);
}