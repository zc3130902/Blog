/*
   非IE浏览器提供一种加载事件：DOMContentLoaded，这个事件可以在完成HTML DOM之后就触发，
   不会理会图像音乐、js文件、css文件或者其他资源是否已经下载完成。

   目前支持DOMContentLoaded的浏览器有 IE9+  Firefox Chomre Safari3.1+ 和 Opera9+

   //传统的DOM加载
   window.onload = function(){
   	var box = document.getElementById('box');
   	alert(box.innerHTML);
   }
   
   //现代DO加载
   addEvent(document,'DOMContentLoaded',function(){
   	var box = document.getElementById('box');
   	alert(box.innerHTML);
   })

   //IE678模拟DOMContentLoaded
   document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"></script>');
   var ie_loaded = document.getElementById('ie_loaded');
   //判断是否完全加载完毕DOM了
   ie_loaded.onreadystatechange = function(){
   	if(this.readyState == 'complete'){
   		var box = document.getElementById('box');
   		alert(box.innerHTML);
   	}
   }
   
   //使用doScroll
   var timer = null;

   timer = setInterval(function(){
   	try{
          document.documentElement.doScroll('left');
          var box = document.getElementById('box');
      		alert(box.innerHTML);
   	}catch(e){

   	}
   });
*/

function addDOMLoaded(fn){
    if(document.addEventListener){//W3C
        addEvent(document,'DOMContentLoaded',function(){
        	fn();
        	removeEvent(document,'DOMContentLoaded',arguments.callee);
        }) 
    }else{ //IE
        var timer = null;

        timer = setInterval(function(){
        	try{
               document.documentElement.doScroll('left');
               fn();
        	}catch(e){

        	}
        });
    }
}

addDOMLoaded(function(){
	alert("")
})