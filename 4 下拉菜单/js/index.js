



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
}