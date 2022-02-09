/**
 * getStyle 封装获取计算后样式属性值的兼容函数
 * @param {*} obj 要获取属性的对象
 * @param {*} attr 要获取的属性
 */
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

var timer = null;
/**
 * animate 封装可以改变多个属性值带有回调函数的缓动函数
 * @param {*} obj 要修改的对象
 * @param {*} json 多个{属性:属性值}的对象
 * @param {*} fn 回调函数
 * 所有属性都到达目标值后才能清理定时器
 */
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;    //flag标记所有属性是否达到对应属性值
        for (var k in json) {
            if (k === "opacity") {   //传入的属性是透明度 opacity
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                obj.style[k] = leader/100;
            } else if (k === "zIndex") {    //传入属性是层级，无需缓动
                obj.style.zIndex = json[k];
            } else {   //改变一般单位为px的属性
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                obj.style[k] = leader + 'px';
                if (leader !== target) flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);     //所有属性达到对应属性值后清理定时器
            if (fn) {   //调用回调函数
                fn();
            }
        }
    }, 15)
}
