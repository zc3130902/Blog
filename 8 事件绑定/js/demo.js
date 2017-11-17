/* 
   对象冒充 call 方法
   call()的第一个参数是所要冒充的对象 第二参数开始为实际的对象参数
   所以要标准化event可以使用 call(obj,window.event) obj为对象以便于使用this  window.event为了实现标准化event



   window.onload = function(){
       alert('1');
   }
   window.onload = function(){
       alert('2');
   }
   window.onload = function(){
       alert('3');
   }

   addEvent(window,'load',function(){
   	alert('1');
   });
   addEvent(window,'load',function(){
   	alert('2');
   });
   addEvent(window,'load',function(){
   	alert('3');
   });

 */

window.onload = function(){

	var oButton = document.getElementById('button');
	//addEvent(oButton,'click',fn);
  //removeEvent(oButton,'click',fn);
  addEvent(oButton,'click',fn1);
  addEvent(oButton,'click',fn1);
  addEvent(oButton,'click',fn1);
}


function fn(e){
  alert(e.clientX);
  //alert(this.value);
}


function fn1(e){
  alert("1" + this.value + e.clientX);
}
function fn2(e){
  alert("2" + this.value + e.clientX);
}
function fn3(e){
  alert("3" + this.value + e.clientX);
}