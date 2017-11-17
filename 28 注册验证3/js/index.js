

$(function(){
   // 个人中心-下拉菜单
   $('.member').hover(function(){
       $(this).css('background','url(images/arrow-up-b.png) no-repeat 85% center').css('background-size','15px')
       $('.member_ul').show().animate({
            t: 30,
            step: 10,
            mul: {
               o:100,
               h:110
            }
          })
   },function(){
       $(this).css('background','url(images/arrow-down-b.png) no-repeat 85% center').css('background-size','15px')
       $('.member_ul').animate({
            t: 30,
            step: 10,
            mul: {
               o:0,
               h:0
            },
            fn:function(){
              $('.member_ul').hide();
            }
          })
   });

   //遮罩画布
   var screen = $('#screen');

   //登录框
   var login = $('#login');
   login.center(350,250).resize(function(){
        //login.center(350,250);
        if(login.css('display') == 'block'){
           screen.lock();
        }
   });
   $('.login').click(function(){
        login.center(350,250).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target: 30,
            t: 30,
            step: 10
        });
   });
   $('#login .close').click(function(){
        login.css('display','none');
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

   //注册框
   var reg = $('#reg');
   reg.center(600,550).resize(function(){
        //login.center(350,250);
        if(reg.css('display') == 'block'){
           screen.lock();
        }
   });
   $('.reg').click(function(){
        reg.center(600,550).css('display','block');
        screen.lock().animate({
            attr : 'o',
            target: 30,
            t: 30,
            step: 10
        }); 
   });
   $('#reg .close').click(function(){
        reg.css('display','none');
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


   //拖拽
   login.drag([$('#login h2').ge(0)]);
   reg.drag([$('#reg h2').ge(0)]);

   //百度分享初始化位置
   $('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2 + 'px');

   // addEvent(window,'scroll',function(){
   //   $('#share').animate({
   //       attr: 'y',
   //       target: getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(),'height')))/2
   //   })
   // })

   $(window).bind('scroll',function(){
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

   //滑动导航
   $('#nav .about li').hover(function(){
         var target = $(this).first().offsetLeft;
         //alert(target);
         $('#nav .nav_bg').animate({
            attr:'x',
            target:target + 20,
            time:30,
            step:10,
            fn:function(){
               $('#nav .white').animate({
                    attr:'x',
                    target:-target,
               })
            }
         })
   },function(){
         $('#nav .nav_bg').animate({
            attr:'x',
            target:20,
            time:30,
            step:10,
            fn:function(){
               $('#nav .white').animate({
                    attr:'x',
                    target:0,
               })
            }
         })
   })

   
   //菜单伸缩
   $('#sidebar h2').toggle(function(){
        $(this).next().animate({
             mul:{
               h:0,
               o:0
             }
        });
   },function(){
        $(this).next().animate({
             mul:{
               h:150,
               o:100
             }
        });
   })


   //表单验证

   //初始化表单操作
   $('form').first().reset();
   //alert($('form').first().user.value)
   //$('form').form('user').value('888');
   //alert($('form').form('user').value())
   $('form').form('user').bind('focus',function(){
        //alert()
        $('#reg .info_user').show();
        $('#reg .succ_user').hide();
        $('#reg .error_user').hide();
   }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            $('#reg .info_user').hide();
            $('#reg .succ_user').hide();
            $('#reg .error_user').hide();
        }else if(!/[\w]{2,20}/.test(trim($(this).value()))){
            $('#reg .error_user').show();
            $('#reg .info_user').hide();
            $('#reg .succ_user').hide();
        }else{
            $('#reg .succ_user').show();
            $('#reg .info_user').hide();
            $('#reg .error_user').hide();
        }
   })
   
   //密码验证
   $('form').form('pass').bind('focus',function(){
        $('#reg .info_pass').show();
        $('#reg .succ_pass').hide();
        $('#reg .error_pass').hide();
   }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            $('#reg .info_pass').hide();
        }else {
        	if(check_pass(this)){
	           $('#reg .info_pass').hide();
	           $('#reg .succ_pass').show();
	           $('#reg .error_pass').hide();
	       }else{
	           $('#reg .info_pass').hide();
	           $('#reg .succ_pass').hide();
	           $('#reg .error_pass').show();
	       }
        }
   })

   //密码强度验证
   $('form').form('pass').bind('keyup',function(){
       check_pass(this);
   })

   //密码验证函数
   function check_pass (_this) {
   	   var value = trim($(_this).value());
   	   var value_length = value.length;
   	   var code_length = 0;
   	   var flag = false;
   	   

   	   //第一个条件6-20位之间
   	   if(value_length >= 6 && value_length <= 20){
   	       $('#reg .info_pass .q1').html('●').css('color','green');
   	   } else {
   	       $('#reg .info_pass .q1').html('○').css('color','#666');
   	   }

   	   //第二个必须条件的验证
   	   if(value_length > 0 && !/\s/.test(value)){
   	       $('#reg .info_pass .q2').html('●').css('color','green');
   	   } else {
   	       $('#reg .info_pass .q2').html('○').css('color','#666');
   	   }

   	   //第三个必须条件 大写字母 小写字母 数字 非空字符 任意两种混拼即可
   	   if(/[\d]/.test(value)){
   	       code_length++;
   	   }
   	   if(/[a-z]/.test(value)){
   	       code_length++;
   	   }
   	   if(/[A-Z]/.test(value)){
   	       code_length++;
   	   }
   	   //console.log(/[^0-9a-zA-Z]/.test(value))
   	   if(/[^\w]/.test(value)){
   	       code_length++;
   	   }
   	   //console.log(code_length);
   	   if(code_length >= 2){
   	       $('#reg .info_pass .q3').html('●').css('color','green');
   	   }else {
   	       $('#reg .info_pass .q3').html('○').css('color','#666');
   	   }

   	   /*
   	       安全级别
   	       高： 大于等于10个字符 三种不同类别的字符混拼
   	       中： 大于等于8个字符 两种不同类别的字符混拼
   	       低： 大于等于1个字符
   	       无： 没有字符
   	       判断的时候从高往低判断 防止高等级执行不到
   	    */
   	   if(value_length >= 10 && code_length >=3) {
   	   	 $('#reg .info_pass .s1').css('color','green');
   	   	 $('#reg .info_pass .s2').css('color','green');
   	   	 $('#reg .info_pass .s3').css('color','green');
   	   	 $('#reg .info_pass .s4').html('高').css('color','green');
   	   } else if(value_length >= 8 && code_length >=2){
   	        $('#reg .info_pass .s1').css('color','green');
   	        $('#reg .info_pass .s2').css('color','green');
   	        $('#reg .info_pass .s3').css('color','#ccc');
   	        $('#reg .info_pass .s4').html('中').css('color','#f60');
   	   } else if(value_length >= 1){
   	        $('#reg .info_pass .s1').css('color','maroon');
   	        $('#reg .info_pass .s2').css('color','#ccc');
   	   	    $('#reg .info_pass .s3').css('color','#ccc');
   	        $('#reg .info_pass .s4').html('低').css('color','maroon');
   	   } else {
   	   	 $('#reg .info_pass .s1').css('color','#ccc');
   	   	 $('#reg .info_pass .s2').css('color','#ccc');
   	   	 $('#reg .info_pass .s3').css('color','#ccc');
   	   	 $('#reg .info_pass .s4').html('');
   	   }

   	   if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) flag = true;

   	   return flag;
   }   


   //密码确认
   $('form').form('notpass').bind('keyup',function(){
        $('#reg .info_notpass').css('display','block');
        $('#reg .error_notpass').css('display','none');
        $('#reg .succ_notpass').css('display','none');
   }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            $('#reg .info_notpass').css('display','none');
        }else if(trim($(this).value()) == trim($('form').form('pass').value())){
            $('#reg .info_notpass').css('display','none');
            $('#reg .error_notpass').css('display','none');
            $('#reg .succ_notpass').css('display','block');
        }else {
            $('#reg .info_notpass').css('display','none');
            $('#reg .error_notpass').css('display','block');
            $('#reg .succ_notpass').css('display','none');
        }
   })

   //回答
   $('form').form('ans').bind('keyup',function(){
        $('#reg .info_ans').css('display','block');
        $('#reg .error_ans').css('display','none');
        $('#reg .succ_ans').css('display','none');
   }).bind('blur',function(){
        if(trim($(this).value()) == ''){
            $('#reg .info_ans').css('display','none');
        }else if(trim($(this).value()).length >= 2 && trim($(this).value()).length <= 32){
            $('#reg .info_ans').css('display','none');
            $('#reg .error_ans').css('display','none');
            $('#reg .succ_ans').css('display','block');
        }else {
            $('#reg .info_ans').css('display','none');
            $('#reg .error_ans').css('display','block');
            $('#reg .succ_ans').css('display','none');
        }
   })


   //电子邮件
   /*
       一个完整的邮箱组成
       邮件名：    a-zA-Z0-9_-.
       域名：      a-zA-Z0-9_-
       域名后缀：  a-zA-Z

       后缀种类： .com .net .cn .asia .mobi .com.cn  .net.cn 

       /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z]{2,4}){1,2}$/

       a-zA-Z0-9_  = \w
       0-9 =  \d
   */
   $('form').form('email').bind('keyup',function(){

        //补全界面
        if($(this).value().indexOf('@') == -1) $('#reg .all_email').css('display','block');
        
        $('#reg .info_email').css('display','block');
        $('#reg .error_email').css('display','none');
        $('#reg .succ_email').css('display','none');
   }).bind('blur',function(){

        //补全界面
        $('#reg .all_email').css('display','none');

        if(trim($(this).value()) == ''){
            $('#reg .info_email').css('display','none');
        }else if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))){
             $('#reg .info_email').css('display','none');
             $('#reg .error_email').css('display','none');
             $('#reg .succ_email').css('display','block');
        }else {
             $('#reg .info_email').css('display','none');
             $('#reg .error_email').css('display','block');
             $('#reg .succ_email').css('display','none');
        }
   })
   
   //电子邮件补全系统键入
   $('form').form('email').bind('keyup',function(event){
       if($(this).value().indexOf('@') == -1){
           $('#reg .all_email').css('display','block');
           $('#reg .all_email li span').html($(this).value());
       }else{
           $('#reg .all_email').css('display','none');
       }

       //alert(event.keyCode);

       $('#reg .all_email li').css('background','none');
       $('#reg .all_email li').css('color','#666');

       if(event.keyCode == 40){
           if(this.index == undefined || this.index >= $('#reg .all_email li').length()-1){
                this.index = 0;
           }else{
                this.index++;
           }
           $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
           $('#reg .all_email li').eq(this.index).css('color','#369');
       }

       if(event.keyCode == 38){
           if(this.index == undefined || this.index <= 0){
                this.index = $('#reg .all_email li').length()-1;
           }else{
                this.index--;
           }
           $('#reg .all_email li').eq(this.index).css('background','#e5edf2');
           $('#reg .all_email li').eq(this.index).css('color','#369');
       }

       if(event.keyCode == 13){
           $(this).value($('#reg .all_email li').eq(this.index).text());
           $('#reg .all_email').css('display','none');
           this.index = undefined;
       }
       
   });

   //电子邮件补全系统点击获取
   //click事件是点击弹起后触发的，而blur失去焦点后，没有了点击弹起的元素，导致无法触发
   // $('#reg all_email li').click(function(){
   //     alert('');
   // })
   $('#reg all_email li').bind('mousedown',function(){
       $('form').form('email').value($(this).text())
   })

   //电子邮件补全系统鼠标移入移出效果
   $('#reg .all_email li').hover(function(){
        $(this).css('background','#e5edf2');
        $(this).css('color','#369');
   },function(){
        $(this).css('background','none');
        $(this).css('color','#666');
   })
   
   
   //年 月 日
   var year = $('form').form('year');
   var month = $('form').form('month');
   var day = $('form').form('day');
   var date = new Date;
   var thisyear = date.getFullYear();

   var day30 = [4,6,9,11];
   var day31 = [1,3,5,7,8,10,12];

   //注入年
   for(var i = 1950; i<=thisyear; i++){
       year.first().add(new Option(i,i),undefined);
   }

   //注入月
   for(var i = 1; i<=12; i++){
       month.first().add(new Option(i,i),undefined);
   }
   
   //alert(inArray(day31,2))
   /*
      闰年的算法 年份除4无余数  或者是 以00结尾的年份除400无余数
   */
   year.bind('change',select_day);
   month.bind('change',select_day);

   function select_day(){
      //清理之前的注入
      day.first().options.length = 1;

      //不确定的日
      var cur_day = 0;

      //注入日
      if(year.value() != 0 && month.value() != 0){
          //alert(parseInt(month.value()))
          if(inArray(day31,parseInt(month.value()))){
               cur_day = 31;
          } else if(inArray(day30,parseInt(month.value()))){
               cur_day = 30;
          } else {
               if((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 ==0){
                    cur_day = 29;
               }else{
                    cur_day = 28;
               }  
          }

          for(var i=1;i<=cur_day;i++){
              day.first().add(new Option(i,i),undefined);
          }

      }else { 
          day.first().options.length = 1;
      }
   }


   //备注
   $('form').form('ps').bind('keyup',cheak_ps).bind('paste',function(){
        //粘贴事件会在内容粘贴到文本框之前触发,延时加载就可以处理
        setTimeout(function(){
            cheak_ps();
        },50);
   });

   //清尾
   $('reg .ps .clear').click(function(){
        $('form').form('ps').value($('form').form('ps').value().substring(0,5));
        cheak_ps();
   })

   function cheak_ps(){
       //alert($(this).value().length);  textarea的内容也是value
       var num = 5 -$('form').form('ps').value().length;
       if(num >= 0) {
          $('#reg .ps').eq(0).css('display','block');
          $('#reg .ps .num').eq(0).html(num);
          $('#reg .ps').eq(1).css('display','none');
       }else {
          $('#reg .ps').eq(0).css('display','none');
          $('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
          $('#reg .ps').eq(1).css('display','block');
       }
   }

})
