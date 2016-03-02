$(function(){
	
  $('.nav li').click(function () {
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
  });
});
