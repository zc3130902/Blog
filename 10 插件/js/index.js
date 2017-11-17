/*


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
    login.drag([$().getTagName('h2').getElement(0)]);
}