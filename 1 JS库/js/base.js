/*
  封装有两种方式：
  1.函数式封装
    function getId(id){
	     return docuemnt.getElementById(id);
    }
  2.对象式封装 //尽可能的简短且富有语义
    Base = {
    	getId : function(id){
            return document.getElementById(id);
    	},
    	getName : function(name){
    		return document.getElementsByName(name);
    	},
    	getTagName : function(tag){
    		return document.getElementsByTagName(tag);
    	}
    }



*/




//获取节点
Base = {
	getId : function(id){
        return document.getElementById(id);
	},
	getName : function(name){
		return document.getElementsByName(name);
	},
	getTagName : function(tag){
		return document.getElementsByTagName(tag);
	}
}