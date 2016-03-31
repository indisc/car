$(document).ready(function(){
	$("picture img").click(function(){
		var quelle 	= $(this).attr("src");
		var title 	= $(this).parent().find("section .head-title").text();
		var subline	= $(this).parent().find("section .sub-title").text();
		$("#bigPic").attr({"src":quelle});
		$("#Htitle").text(title);
		$("#Stitle").text(subline);
	});

});

