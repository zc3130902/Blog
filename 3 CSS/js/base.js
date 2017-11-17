/*
  getComputedStyle 语法
  var style = window.getComputedStyle("元素", "伪类");
  例 不过为了兼容 currentStyle 舍弃了伪类
  var style = window.getComputedStyle(a,:hover);

*/


//前台调用
var $ = function(){ 
    return new Base();
}

//基础库
function Base(){
    //创建一个数组，来保存获取的节点和节点的数组
    this.elements = [];
}



//获取ID节点
Base.prototype.getId = function(id){
    this.elements.push(document.getElementById(id));
    return this; // 返回对象Base 
}

//获取元素节点
Base.prototype.getTagName = function(tag){
    var tags = document.getElementsByTagName(tag);
    for(var i = 0; i<tags.length; i++){
        this.elements.push(tags[i]);
    }
    return this;
}

//获取CLASS节点 数组
//因为w3c提供的 getElementsByClassName 存在兼容问题，所以我们采取获得所有节点 然后在比较classname的方法
Base.prototype.getClass = function(className,idName){
    var node = null;//从属某一id的class
    if(arguments.length==2){
        node = document.getElementById(idName);
    }else{
        node = document;
    }
    var all = node.getElementsByTagName("*");
    for(var i = 0; i<all.length; i++){
        if(all[i].className == className){
            this.elements.push(all[i]);
        }
        
    }
    return this;
}

//获取某一个节点
Base.prototype.getElement = function(num){
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
                if(typeof window.getComputedStyle != "undefined"){//W3C
                      return window.getComputedStyle(this.elements[i],null)[attr];
                }else if(typeof this.elements[i].currentStyle != "undefined"){//IE
                      return this.elements[i].currentStyle[attr];
                }
            }

            this.elements[i].style[attr] = value;
        }  
        return this; 
}

//添加class
Base.prototype.addClass = function(className){
     for(var i = 0; i<this.elements.length; i++){
         if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
            this.elements[i].className += ' ' + className;
         }
     }
     return this;
}

//移除class
Base.prototype.removeClass = function(className){
     for(var i = 0; i<this.elements.length; i++){
         if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),"");
         }
     }
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

//触发点击事件
Base.prototype.click = function(fn){
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].onclick = fn;
        }  
        return this;
}