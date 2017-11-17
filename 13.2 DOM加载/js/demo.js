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
/*
上一节课代码
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



//向下兼容 最简单的方法
window.onload = function(){
    alert("")
}

*/


// 使用 readyState
//alert(document.readyState);
// var isReady = false;
// var timer = null;
// function doReady(fn){
//     if(timer) clearInterval(timer);
//     if(isReady) return;
//     isReady = true;
//     fn();
// }

// function addDomLoaded(fn){
//   //用于非主流浏览器的向下兼容
  
//   //图片加载完才执行
//   timer = setInterval(function(){
//     if(/loaded|complete/.test(document.readyState)){
//          doReady(fn);
//     }
//   },1)
  
//   timer = setInterval(function(){
//     if(document && document.getElementById && document.getElementsByTagName && document.body){
//          doReady(fn);
//     }
//   },1)
// }

// addDomLoaded(function(){
//     alert("")
// })

//整合
// function addDomLoaded(fn){
//   var isReady = false;
//   var timer = null;
//   function doReady(){
//       if(timer) clearInterval(timer);
//       if(isReady) return;
//       isReady = true;
//       fn();
//   }

//   if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
//       //无论哪种基本都用不到
//       /*方案一
//         timer = setInterval(function(){
//           if(/loaded|complete/.test(document.readyState)){
//                doReady();
//           }
//         },1)
//       */
//       //方案二  
//         timer = setInterval(function(){
//           if(document && document.getElementById && document.getElementsByTagName && document.body){
//                doReady();
//           }
//         },1)
//     }else if(document.addEventListener){//W3C
//             addEvent(document,'DOMContentLoaded',function(){
//               fn();
//               removeEvent(document,'DOMContentLoaded',arguments.callee);
//             }) 
//     }else if(sys.ie && sys.ie < 9){
//             var timer = null;

//             timer = setInterval(function(){
//               try{
//                    document.documentElement.doScroll('left');
//                    doReady();
//               }catch(e){}
//             },1);
//     }
// }

addDomLoaded(function(){
  alert("1")
})