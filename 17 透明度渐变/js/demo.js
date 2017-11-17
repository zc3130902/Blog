
/*
//动画

$(function(){
    
    var box = document.getElementById('box');
    alert(getStyle(box,'left'));

    setInterval(function(){
        box.style.left = getStyle(box,'left') + 1 + 'px';
    },50)


    //$('#box').
})
*/

//alert(Math.ceil(5.1)); //向上取整
//alert(Math.floor(5.1)); //向下取整


$(function(){
	$('#btn').click(function(){
		$('#box').animate({
			'attr':'o',
			//'start':30,
			'target':100,
			'step':7,
		});
	});
    
})
