
var menu = document.getElementById('menu');

document.oncontextmenu = function(e){
    menu.style.left = e.clientX + "px";
    menu.style.top = e.clientY + "px";
    menu.style.display = "block";
    return false;
}

document.onclick = function(){
    menu.style.display = "none";
}