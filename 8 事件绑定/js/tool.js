
/*
   因为IE现代绑定事件存在着 1.无法删除事件 2.无法顺序执行  3.内存泄露等问题。
   所以要使用传统绑定事件来模拟现代绑定事件

   现代绑定事件（call方法的对象冒充）

   obj.attachEvent('on' + type,function(){
     fn.call(obj,window.event); //对象冒充
   });


   实现累加，并且清晰的指出是专给addEvent用的
   JS一切皆为对象，所以addEvent.ID语法正确，实际上是一个全局变量
   alert(addEvent.ID);
   addEvent.ID++;
*/

//跨浏览器事件绑定
function addEvent(obj,type,fn){
    if(typeof obj.addEventListener != 'undefined'){
        obj.addEventListener(type,fn);
    }else{
        //创建一个存放事件的哈希表（散列表）
        if(!obj.events) obj.events = {};

        //第一次执行时执行
        if(!obj.events[type]){
          //创建一个存放事件处理函数的数组
          obj.events[type] = [];
          //把第一次的事件处理函数先储存到第一个位置上
          if(obj['on' + type]) obj.events[type][0] = fn;
        }else{
          //同一个注册函数进行屏蔽，不添加到计数器中
          if(addEvent.equal(obj.events[type],fn) == true){
              return false;
          }
        }
        //从第二次开始我们用事件计数器来存储
        obj.events[type][addEvent.ID++] = fn;

        //执行事件处理函数
        obj['on' + type] = addEvent.exec;

    }
}

//为每个事件分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function(event){
    var e = event || window.event;
    var es = this.events[e.type];
    for(var i in es){
         es[i].call(this,e);
    }
};

//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
    for(var i in es){
         if(es[i] == fn) return true;
    }
    return false;
};

//跨浏览器删除事件
function removeEvent(obj,type,fn){
    if(typeof obj.removeEventListener != 'undefined'){
        obj.removeEventListener(type,fn);
    }else if(typeof obj.detachEvent != 'undefined'){
        obj.detachEvent('on' + type,fn);
    }
}

//跨浏览器获取视口大小
function getInner(){
    if(typeof window.innerWidth != 'undefined'){
        return {
            width : window.innerWidth,
            height: window.innerHeight
        }
    }else{
        return {
            width : document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}


//跨浏览器获取style
function getStyle(element,attr){
    if(typeof window.getComputedStyle != "undefined"){//W3C
          return window.getComputedStyle(element,null)[attr];
    }else if(typeof element.currentStyle != "undefined"){//IE
          return element.currentStyle[attr];
    }
}


//判断class是否存在
function hasClass(element,className){
     return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}


//跨浏览器添加link规则
function insertRule(sheet,selectorText,cssText,position){
     if(typeof sheet.insertRule != "undefined"){//  W3C
          sheet.insertRule(selectorText+'{' + cssText + '}',position);
     }else if(typeof sheet.addRule != "undefined"){// IE
          sheet.addRule(selectorText,cssText,position);
     }
}

//跨浏览器移除link规则
function removeRule(sheet,index){
     if(typeof sheet.deleteRule != "undefined"){//  W3C
          sheet.deleteRule(index);
     }else if(typeof sheet.removeRule != "undefined"){// IE
          sheet.removeRule(index);
     }
}

//获取 Event对象
function getEvent(event){
   return event || window.event;
}

//阻止默认行为
function preDef(event){
   var e = getEvent(event);
   if(typeof e.preventDefault != 'undefined'){//  W3C
       e.preventDefault();
   }else{// IE
       e.returnValue = false;
   }
}


