/*
  1. 函数式调用

  alert(getId('box').innerHTML);

  2. 对象式调用
  alert(Base.getId("box").innerHTML);
  alert(Base.getName("sex")[0].value);
  alert(Base.getTagName("p")[0].innerHTML);
*/




window.onload = function(){
  alert(Base.getId("box").innerHTML);
  alert(Base.getName("sex")[0].value);
  alert(Base.getTagName("p")[0].innerHTML);
}