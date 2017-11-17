/*
   // 函数有prototype 属性 函数的__proto__ 是 Function 对象
    // 对象有__proto__ 缺没有prototype
    var aa = {};
    alert(aa.__proto__);
    alert(aa.prototype);
    
    var bb = function(){};
    alert(bb.__proto__);
    alert(bb.prototype);


    alert(document.documentElement.clientWidth); // 兼容所有浏览器的宽度
    alert(document.documentElement.clientHeight); // 兼容所有浏览器的高度
*/



window.onload = function(){

	// 个人中心-下拉菜单
    $().getClass('member').hover(function(){
    	//$().getClass('member').css('background','url(images/arrow-up-b.png) no-repeat 85% center').css('background-size','15px');
        $(this).css('background','url(images/arrow-up-b.png) no-repeat 85% center').css('background-size','15px')
        $().getClass('member_ul').show();
    },function(){
    	//$().getClass('member').css('background','url(images/arrow-down-b.png) no-repeat 85% center').css('background-size','15px');
        $(this).css('background','url(images/arrow-down-b.png) no-repeat 85% center').css('background-size','15px')
        $().getClass('member_ul').hide();
    });


    //登录框
    var login = $().getId('login');
    login.center(350,250).resize(function(){
         login.center(350,250);
    });
    $().getClass('login').click(function(){
         login.show();
    });
    $().getClass('close').click(function(){
         login.hide();
    });
    // var top  = (document.documentElement.clientHeight-250)/2; 
    // var left  = (document.documentElement.clientWidth-350)/2; 
    // $().getId('login').css('top',top+'px').css('left',left+'px');
    
    
}