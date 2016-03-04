$(document).ready(function(){
	$("picture img").click(function(){
		var quelle = $(this).attr("src");
		$("#bigPic").attr({"src":quelle});
	});

});

