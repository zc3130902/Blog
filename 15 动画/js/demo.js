
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

$(function(){
	$('#btn').click(function(){
		$('#box').animate({
			'attr':'top',
			'start':100,
			'alter':150,
			'step':1
		});
	});
    
})