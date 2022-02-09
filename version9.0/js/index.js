var carousel = document.getElementById("carousel");
var btn = document.getElementById("btn");
var contentCarousel = document.getElementsByClassName("content")[0];
var focusPoint = document.getElementById('focus');
var leftFocus = document.getElementById('left');
var rightFocus = document.getElementById('right');
var imageWidth, pic = 0, btnNum = 0;
var timer = null;
// 初始化页面
function init() {
    // 初始化 carousel
    for (var i = 0; i < 11; i++) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.setAttribute("src", "./images/tu" + (i + 1) + ".jpg")
        li.appendChild(img);
        carousel.appendChild(li);
    }
    // 将第一张图片 clone 到最后
    var firstLi = carousel.firstChild.cloneNode(true);
    carousel.appendChild(firstLi);
    // 初始化 btn
    for (var i = 0; i < carousel.children.length - 1; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        btn.appendChild(li);
    }
    btn.children[0].className = 'current';
    imageWidth = carousel.children[1].offsetLeft;
}

// 按钮随鼠标改变
function btnChange() {
    for (var i = 0; i < btn.children.length; i++) {
        btn.children[i].index = i;
        btn.children[i].onmouseover = function () {
            for (var j = 0; j < btn.children.length; j++) {
                btn.children[j].className = '';
            }
            pic = this.index;
            btnNum = this.index;
            this.className = 'current';
            var target = - pic * imageWidth;
            animate(carousel, target);
        }
    }

}

// 控制左右焦点的出现消失
function focusControl() {
    contentCarousel.onmouseenter = function () {
        focusPoint.style.display = "block";
        clearInterval(timer);
    }
    contentCarousel.onmouseleave = function () {
        focusPoint.style.display = "none";
        timer = setInterval(rightFocus.onclick, 2000)
    }
    // 左焦点点击事件
    leftFocus.onclick = function () {
        if (pic <= 0) {
            pic = carousel.children.length - 1;
            carousel.style.left = -(carousel.children.length - 1)*imageWidth + 'px';
        }
        pic--;
        var target = - pic * imageWidth;
        animate(carousel, target);
        btnNum--;
        if (btnNum < 0) btnNum = carousel.children.length - 2;
        for (var j = 0; j < btn.children.length; j++) {
            btn.children[j].className = '';
        }
        btn.children[btnNum].className = 'current'
    }
    // 右焦点点击事件
    rightFocus.onclick = function () {
        if (pic >= carousel.children.length - 1) {
            pic = 0;
            carousel.style.left = 0;
        }
        pic++;
        var target = - pic * imageWidth;
        animate(carousel, target);
        for (var j = 0; j < btn.children.length; j++) {
            btn.children[j].className = '';
        }
        btnNum++;
        if (btnNum >= carousel.children.length - 1){
            btnNum = 0;
        }
        btn.children[btnNum].className = 'current'
    }
    // 设置定时器用于自动播放
    timer = setInterval(rightFocus.onclick, 2000);
}

// 动画效果
// function animate(obj, target) {
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         var leader = obj.offsetLeft;
//         var step = 30;
//         step = leader < target ? step : -step;
//         if (Math.abs(leader - target) >= Math.abs(step)) {
//             leader += step;
//             obj.style.left = leader + 'px';
//         } else {
//             obj.style.left = target + 'px';
//             clearInterval(obj.timer);
//         }
//     }, 15)
// }


//函数覆盖，缓动效果
function animate(obj,target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = (target - leader) / 30;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        obj.style.left = leader + 'px';
        if(leader === target){
            clearInterval(obj.timer);
        }
    }, 15)
}

init()
btnChange()
focusControl()