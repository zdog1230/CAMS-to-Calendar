window.onload = function(){
	function nWin() {
	  var w = window.open();
	  var html = $("#toNewWindow").html();

		$(w.document.body).html(html);
	}

	$(function() {
		$("a#print").click(nWin);
	});​
}