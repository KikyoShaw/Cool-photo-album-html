var oImg = document.getElementsByTagName('img');
var wrap = document.getElementById('wrap');

// 构造函数
function rotateAlbum() {}

// 初始化3D相册效果
rotateAlbum.prototype.init = function () {
    // 页面加载完毕再处理
    window.onload = function () {
        var deg = 360 / oImg.length;
        for (var i = 0; i < oImg.length; i++) {
            oImg[i].style.transform = "rotateX(-10deg)  rotateY(" + (deg*i) + "deg) translateZ(400px)";
            oImg[i].style.transition = 1 + (oImg.length - i)*0.1 +"s";
        }
    }

}

// 鼠标事件操作3D相册的旋转
rotateAlbum.prototype.drag = function(){
    var rotateX = -20, rotateY = 0; //初始化度数值
    document.onmousedown = function(event){
        var oldX = event.clientX, oldY = event.clientY;
        this.onmousemove = function(event){
            var newX = event.clientX, newY = event.clientY;
            var diffX = oldX - newX, diffY = oldY - newY;
            rotateX += diffY, rotateY -= diffX;
            wrap.style.transform = "rotateX("+rotateX*0.005+"deg) rotateY("+rotateY*0.005+"deg)"
        }
        this.onmouseup = function(){
            this.onmousemove = null;    //清空鼠标移动事件
        }
    }
}

var rot = new rotateAlbum();
rot.init();
rot.drag();