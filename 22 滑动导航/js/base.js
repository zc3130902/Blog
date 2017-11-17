/*

*/


//前台调用
var $ = function(args){ 
    return new Base(args);
}

//基础库
function Base(args){
    //创建一个数组，来保存获取的节点和节点的数组
    this.elements = [];

    if(typeof args == 'string'){
    //css模拟
        //alert(args.indexOf(' '));
        if(args.indexOf(' ') != -1){
             var elements = args.split(' ');  //把节点拆开分别保存
             var childElements = [];          //存放临时节点对象的数组,解决被覆盖的问题
             var node = [];                   //用来存放父节点
             //alert(elements.length);
             for(var i = 0; i<elements.length; i++){
                if(node.length == 0)  node.push(document);
                switch(elements[i].charAt(0)){ // charAt()返回指定位置的字符
                   case '#':
                        childElements = [];   //清理掉临时节点 实现父节点失效 子节点有效
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements; //保存父节点，以免被清理掉
                        break;
                   case '.':
                        childElements = [];
                        for(var j = 0; j<node.length; j++){
                            var temps = this.getClass(elements[i].substring(1),node[j]);
                            for(var k = 0; k<temps.length; k++){
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                   default:
                        childElements = [];
                        for(var j = 0; j<node.length; j++){
                            var temps = this.getTagName(elements[i],node[j]);
                            for(var k = 0; k<temps.length; k++){
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                    }
             }
             this.elements = childElements;

        }else{//find模拟
             switch(args.charAt(0)){ // charAt()返回指定位置的字符
                case '#':
                     this.elements.push(this.getId(args.substring(1)));
                     break;
                case '.':
                     this.elements = this.getClass(args.substring(1));
                     break;
                default:
                     this.elements = this.getTagName(args);
             };
        }
    }else if(typeof args == 'object'){//如果是object说明就是传递过来的this对象
        if(args != undefined){//这里_this是一个对象 undefined也是一个对象 区别typeof返回的 字符串undefined
              this.elements[0] = args;
        }
    }else if(typeof args == 'function'){
        //addDomLoaded(args);
        this.ready(args);
    }
}

//addDomLoaded
Base.prototype.ready = function(fn){
    addDomLoaded(fn);
}

//获取ID节点
Base.prototype.getId = function(id){
    return document.getElementById(id)
}

//获取元素节点
Base.prototype.getTagName = function(tag,parentNode){
    var node = null;//从属某一id的class
    //alert(parentNode);
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for(var i = 0; i<tags.length; i++){
        temps.push(tags[i]);
    }
    return temps;
}

//获取CLASS节点 数组
//因为w3c提供的 getElementsByClassName 存在兼容问题，所以我们采取获得所有节点 然后在比较classname的方法
Base.prototype.getClass = function(className,parentNode){
    var node = null;//从属某一id的class
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var all = node.getElementsByTagName("*");
    for(var i = 0; i<all.length; i++){
        if(all[i].className == className){
            temps.push(all[i]);
        }
    }
    return temps;
}

//设置CSS选择器子节点
Base.prototype.find = function(str){
        var childElements = [];
        for(var i = 0; i<this.elements.length; i++){
            switch(str.charAt(0)){ 
               case '#':
                    childElements.push(this.getId(str.substring(1)));
                    break;
               case '.':
                    var temps = this.getClass(str.substring(1),this.elements[i]);
                    for (var j = 0; j < temps.length; j++) {
                        childElements.push(temps[j]);
                    }
                    break;
               default:
                   var temps = this.getTagName(str,this.elements[i]);
                   for (var j = 0; j < temps.length; j++) {
                       childElements.push(temps[j]);
                   }
            }
        }  
        this.elements = childElements;
        return this;    
}

//获取某一个节点，并且返回这个节点对象
Base.prototype.ge = function(num){  //getElement
     return this.elements[num];
}

//获取首个节点 对象
Base.prototype.first = function(num){
     return this.elements[0];
}

//获取末个节点 对象
Base.prototype.last = function(num){
     return this.elements[this.elements.length - 1];
}

//获取某一个节点，返回Base对象
Base.prototype.eq = function(num){
     var element = this.elements[num];
     this.elements = [];
     this.elements[0] = element;
     return this;
}


//设置CSS
Base.prototype.css = function(attr,value){
        for(var i = 0; i<this.elements.length; i++){

            //获取样式的值
            if(arguments.length == 1){//因为获取时 只需要一个属性名 ，所以参数为1
                return getStyle(this.elements[i],attr);
            }

            this.elements[i].style[attr] = value;
        }  
        return this; 
}

//添加class
Base.prototype.addClass = function(className){
     for(var i = 0; i<this.elements.length; i++){
         if(!hasClass(this.elements[i],className)){
            this.elements[i].className += ' ' + className;
         }
     }
     return this;
}

//移除class
Base.prototype.removeClass = function(className){
     for(var i = 0; i<this.elements.length; i++){
         if(hasClass(this.elements[i],className)){
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + 

'(\\s|$)'),"");
         }
     }
     return this;
}

//添加link或style的CSS规则
Base.prototype.addStyle = function(num,selectorText,cssText,position){
     var sheet = document.styleSheets[num];
     insertRule(sheet,selectorText,cssText,position);
     return this;
}

//移除link或style的CSS规则
Base.prototype.removeStyle = function(num,index){
     var sheet = document.styleSheets[num];
     removeRule(sheet,index);
     return this;
}


//设置innerHTML
Base.prototype.html = function(str){
        for(var i = 0; i<this.elements.length; i++){

            //获取html
            if(arguments.length == 0){//因为获取时 不需要传参数，所以参数数量为0
                return this.elements[i].innerHTML;
            }

            this.elements[i].innerHTML = str;
        }  
        return this;
}

//设置鼠标，移入移出 方法
Base.prototype.hover = function(over,out){
        for(var i = 0; i<this.elements.length; i++){
            addEvent(this.elements[i],'mouseover',over);
            addEvent(this.elements[i],'mouseout',out);
        }  
        return this;
}

//设置显示
Base.prototype.show = function(){
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].style.display = 'block';
        }  
        return this;
}

//设置隐藏
Base.prototype.hide = function(){
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].style.display = 'none';
        }  
        return this;
}

//设置物体居中
Base.prototype.center = function(width,height){
     var top  = (getInner().height-height)/2; 
     var left  = (getInner().width-width)/2;
     for(var i = 0; i<this.elements.length; i++){
            this.elements[i].style.top = top + 'px';
            this.elements[i].style.left = left + 'px';
        }  
     return this;
}

//设置锁屏
Base.prototype.lock = function(){
     for(var i = 0; i<this.elements.length; i++){
            this.elements[i].style.display = 'block';
            this.elements[i].style.width = getInner().width + 'px';
            this.elements[i].style.height = getInner().height + 'px';
            document.documentElement.style.overflow = 'hidden';

            //锁屏时防止下拉
            addEvent(window,'scroll',scrollTop)
        }  
     return this;
}

//取消锁屏
Base.prototype.unlock = function(){
     for(var i = 0; i<this.elements.length; i++){
            this.elements[i].style.display = 'none';
            document.documentElement.style.overflow = 'auto';

            //解屏时可以下拉
            removeEvent(window,'scroll',scrollTop)
        }  
     return this;
}

//触发点击事件
Base.prototype.click = function(fn){
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].onclick = fn;
        }  
        return this;
}

//窗口改变事件
Base.prototype.resize = function(fn){
        for(var i = 0; i<this.elements.length; i++){
            var element = this.elements[i];

            addEvent(window,'resize',function(){
                fn();
                if(element.offsetLeft > getInner().width - element.offsetWidth){
                    element.style.left = getInner().width - element.offsetWidth + 'px';
                }
                if(element.offsetTop > getInner().heigth - element.offsetHeight){
                    element.style.top = getInner().heigth - element.offsetHeight + 'px';
                }
            })
        }
        
            
        return this;
}

//设置动画
//多个动画可能会导致动画的终止 因为动画采用的是同一个定时器 所以要初始化多个定时器
//动画的顺序执行，可以用obj.fn()来解决
Base.prototype.animate = function(obj){
      for(var i = 0; i<this.elements.length; i++){ 
          var element = this.elements[i];
          //var attr = obj['attr'] != undefined ? obj['attr'] : 'left';  //可选left和top两种值，默认left
          var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
                     obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :
                     obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';
          var start = obj['start'] != undefined ? obj['start'] : 
                      attr == 'opacity'? parseFloat(getStyle(element,attr))*100 : parseInt(getStyle(element,attr));
          var time = obj['time'] != undefined ? obj['time'] : 10;  //可选 默认50毫秒执行一次
          var step = obj['step'] != undefined ? obj['step'] : 20;  //可选 步长
          
          var alter = obj['alter'];
          var target = obj['target'];
          var mul = obj['mul'];

          var speed = obj['speed'] != undefined ? obj['speed'] : 6; //可选 速度
          var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';  //0 constant 匀速 1 buffer 缓冲


          if(alter != undefined && target == undefined){
              target = alter + start;
          }else if(alter == undefined && target == undefined && mul == undefined ){
              throw new Error('alter增量、target目标量和mul对象必须传一个');
          }

          
          if(start > target) step = -step;
          
          if(attr == 'opacity'){
               element.style.opacity = parseInt(start) / 100;
               element.style.filter = 'alpha(opacity='+ parseInt(start) + ')';
          }else{
              element.style[attr] = start + 'px';
          }

          

          if(mul == undefined){//如果传递的是单个动作，导致失效，需要创建mul
              mul = {}
              mul[attr] = target;

          }

          clearInterval(element.timer); //定时器如果是按钮触发会累加，导致越来越快 所以每次点击要清空定时器
          element.timer = setInterval(function(){

              /*
                  存在两个问题：
                  1.多个动画会执行多个列队动画 原因：同步动画循环导致
                  2.多个动画的最终值不一致的时候，可能会导致一个结束了另一个没结束  原因：定时器提前清空导致

                  解决方案：
                  1.不管多少个动画，只提供一次队列动画的机会
                  2.多个动画按最后一个分动画执行完毕后再清理即可

              */


              //创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
              var flag = true; //表示都执行完毕了

              for(var i in mul) {//同步动画
                   //alert(i);
                   //alert(mul[i]);
                   attr = i == 'x' ? 'left':i == 'y' ? 'top':i == 'w' ? 'width':i == 'h' ? 'height':i == 'o' ? 'opacity':i != undefined ? i:'left';
                   target = mul[i];
              

                  if(type == 'buffer'){
                      step = attr == 'opacity'? (target - parseFloat(getStyle(element,attr))*100) / speed:
                                                (target - parseInt(getStyle(element,attr))) / speed;
                      step = step > 0 ? Math.ceil(step) : Math.floor(step);                      // 正值用ceil 负值用floor
                  }


                  if(attr == 'opacity'){
                      //透明动画
                      if(step == 0) {
                         setOpacity();
                      }else if(step > 0 && Math.abs(parseFloat(getStyle(element,attr))*100 - target) <= step){
                         setOpacity();
                      }else if(step < 0 && parseFloat(getStyle(element,attr))*100 - target <= Math.abs(step)){
                         setOpacity();
                      }else{
                         var temp = parseFloat(getStyle(element,attr)) * 100;
                         element.style.opacity = parseInt(temp + step) / 100;
                         element.style.filter = 'alpha(opacity='+ parseInt(temp + step) + ')';
                      }     

                      if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr))*100)) flag = false;
                      
                  }else {
                      //运动动画
                      if(step == 0) {
                         setTarget();
                      }else if(step > 0 && Math.abs(parseInt(getStyle(element,attr)) - target) <= step){
                         setTarget();
                      }else if(step < 0 && parseInt(getStyle(element,attr)) - target <= Math.abs(step)){
                         setTarget();
                      }else{
                         //不会和停止运动同时执行
                         element.style[attr] = parseInt(getStyle(element,attr)) + step + 'px';
                      }

                      if(parseInt(target) != parseInt(getStyle(element,attr))) flag = false;  //如果当前值和目标值不同 flag是false
                  }
               
                  
              //document.getElementById('aaa').innerHTML += getStyle(element,attr) + '<br/>'
              //document.getElementById('aaa').innerHTML += getStyle(element,attr) + '<br/>'
              }

              if(flag){ //如果flag是true 说明动画全部执行完毕 清理定时器
                  clearInterval(element.timer);
                  if(obj.fn) obj.fn();
              }
              
          },time);

          function setTarget(){
              element.style[attr] = target + 'px';
          }

          function setOpacity(){
              element.style.opacity = parseInt(target) / 100;
              element.style.filter = 'alpha(opacity='+ parseInt(target) + ')';
          }
      }
      return this;
}


//插件入口
Base.prototype.extend = function(name,fn){
      Base.prototype[name] = fn;
}

