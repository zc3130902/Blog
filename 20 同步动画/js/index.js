

$(function(){
   // 个人中心-下拉菜单
   $('.member').hover(function(){
       $(this).css('background','url(images/arrow-up-b.png) no-repeat 85% center').css('background-size','15px')
       $('.member_ul').show().animate({
            attr : 'o',
            target:100,
            t: 30,
            step: 10
          })
   },function(){
       $(this).css('background','url(images/arrow-down-b.png) no-repeat 85% center').css('background-size','15px')
       $('.member_ul').animate({
            attr : 'o',
            start: 100,
            target:0,
            t: 30,
            step: 10,
            fn:function(){
              $('.member_ul').hide();
            }
          })
   });

   //登录框
   var login = $('#login');
   var screen = $('#screen');
   login.center(350,250).resize(function(){
        //login.center(350,250);
        if(login.css('display') == 'block'){
           screen.lock();
        }
   });
   $('.login').click(function(){
        login.center(350,250);
        screen.lock().animate({
            attr : 'o',
            target: 30,
            t: 30,
            step: 10
        });
        login.show(); 
   });
   $('.close').click(function(){
        login.hide();
        screen.animate({
            attr : 'o',
            target: 0,
            t: 30,
            step: 10,
            fn:function(){
               screen.unlock()
            }
        });
   });
/*
   //test
   $('#test').click(function() {
        var _this = this;
        $(_this).animate({
            attr : 'w',
            target: 300,
            t : 30,
            step: 10,
            fn : function(){
               $(_this).animate({
                 attr : 'h',
                 target: 150,
                 t : 30,
                 step: 10

            })}
        })
   });

   //test1
   $('.test1').hover(function(){
       $(this).animate({
           attr : 'w',
           target: 300,
           t : 30,
           step: 10
         })
   },function(){
       $(this).animate({
           attr : 'w',
           target: 100,
           t : 30,
           step: 10
         })
   })
*/

   $('#test1').click(function() {
       $(this).animate({
            attr: 'width',
            target: 300
       });
   });

   // $('#test1').click(function() {
   //     $(this).animate({
   //          t:30,
   //          step:10,
   //          //mul 参数是一个对象，只有  属性: 目标值 
   //          mul: {
   //             w: 300,
   //             h: 300
   //          }
   //     });
   // });

   //拖拽
   login.drag([$('h2').ge(0)]);

   //百度分享初始化位置
   $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2 + 'px');

   addEvent(window,'scroll',function(){
     $('#share').animate({
         attr: 'y',
         target: getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2
     })
   })
   
   //百度分享收缩效果
   $('#share').hover(function(){
         $(this).animate({
             'attr':'x',
             'target': 0
         })
   },function(){
         $(this).animate({
             'attr':'x',
             'target': -211
         })
   })
})
