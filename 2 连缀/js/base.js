/*
  连缀：一句话同时设置一个或者多个节点操作

*/




//获取节点
// Base = {
// 	getId : function(id){
//         return document.getElementById(id);
// 	},
// 	getName : function(name){
// 		return document.getElementsByName(name);
// 	},
// 	getTagName : function(tag){
// 		return document.getElementsByTagName(tag);
// 	}
// }


var $ = function(){  //为了让每一次都是一个实例，所以每个方法都要重新new一个函数
    return new Base();
}

//对象函数表示法
function Base(){

    //创建一个数组，来保存获取的节点和节点的数组
    this.elements = [];
    
    //获取ID节点
    this.getId = function(id){
        this.elements.push(document.getElementById(id));
        return this; // 返回对象Base 
    }

    //获取元素节点
    this.getTagName = function(tag){//因为tagname是一个数组，直接写将只能获得一个，所以要逐个赋值
        var tags = document.getElementsByTagName(tag);
        for(var i = 0; i<tags.length; i++){
            this.elements.push(tags[i]);
        }
        return this;
    }
    
}


Base.prototype.css = function(attr,value){ //attr 传过来应该是字符串 所以使用数组的方式不用点,又因为elements是数组，所以要获取第0个 这里也要进行循环
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].style[attr] = value;
        }  
        return this; //返回Base 对象
}

Base.prototype.html = function(str){
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].innerHTML = str;
        }  
        return this; //返回Base 对象
}

Base.prototype.click = function(fn){
        for(var i = 0; i<this.elements.length; i++){
            this.elements[i].onclick = fn;
        }  
        return this; //返回Base 对象
}