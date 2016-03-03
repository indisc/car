$(document).ready(function(){
	$("picture img").click(function(){
		var quelle = $(this).attr("src");
		var h1 = $(this).attr("h1");
		var p = $(this).attr("p");
		$("#bigPic").attr({"src":quelle, "h1":h1, "p":p});
	});
});