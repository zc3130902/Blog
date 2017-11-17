/*
   Base.getId("box").css('color','red').css('backgroundColor','black').html('pox').click(function(){
	  alert('a');
   });

   Base 是一个基础库的核心对象

   Base.getId('box') 返回的是一个divElement，这个对象没有css方法
   将Base.getId('box')返回改成Base即可，返回Base 对象
   Base.getId("box").css('color','red')返回的也是Base对象，所以可以导致连续调用
   Base.getId("box").css('color','red').css('backgroundColor','black')返回的也是Base对象
   Base.getId("box").css('color','red').css('backgroundColor','black').html('pox')返回的也是Base对象
    Base.getId("box").css('color','red').css('backgroundColor','black').html('pox').click(function(){
	  alert('a');
   });返回的也是Base对象


 

   在Base对象中，添加css方法，html方法，click方法
*/




window.onload = function(){
  $().getId('box').css('color','red').css('backgroundColor','pink');
  //alert(base.getTagName("p").elements.length);
  $().getTagName("p").css('color','green').html('你说啥').click(function(){
  	alert('a');
  }).css('backgroundColor','red');
}