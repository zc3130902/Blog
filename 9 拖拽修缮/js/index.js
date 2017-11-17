/*
    实现拖拽 要使用三个事件 mousedown  mousemove  mouseup

    鼠标位置 event.clientX  event.clientY  
    元素的实际位置 element.offsetLeft   element.offsetTop

    offset 代表元素 offsetLeft offsetWidth


    未封装代码
    var oLogin = document.getElementById('login');
    oLogin.onmousedown = function(e){//点击需要划定区域为oLogin
        var e = getEvent(e);
        var _this = this; // oLogin
        var diffX = e.clientX - _this.offsetLeft;
        var diffY = e.clientY - _this.offsetTop;
        document.onmousemove = function(e){//移动的区域是document
            var e = getEvent(e);
            _this.style.left = e.clientX - diffX + 'px';
            _this.style.top = e.clientY - diffY + 'px';
        }
        document.onmouseup = function(e){
            this.onmousemove = null; //document
            this.onmouseup = null;
        }
    }

*/



window.onload = function(){

	// 个人中心-下拉菜单
    $().getClass('member').hover(function(){
        $(this).css('background','url(images/arrow-up-b.png) no-repeat 85% center').css('background-size','15px')
        $().getClass('member_ul').show();
    },function(){
        $(this).css('background','url(images/arrow-down-b.png) no-repeat 85% center').css('background-size','15px')
        $().getClass('member_ul').hide();
    });


    //登录框
    var login = $().getId('login');
    var screen = $().getId('screen');
    login.center(350,250).resize(function(){
         //login.center(350,250);
         if(login.css('display') == 'block'){
            screen.lock();
         }
    });
    $().getClass('login').click(function(){
         login.center(350,250);
         screen.lock();
         login.show(); 
    });
    $().getClass('close').click(function(){
         login.hide();
         screen.unlock();
    });
    
    //拖拽
    login.drag();
}