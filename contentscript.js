	
	//$(function(){alert($("#menuHiddenMessage").children().textContent)});
	var $foo = "HTML: " + $("#menuHiddenMessage").size();
	$(function(){alert($foo)});
	//$(function(){alert($("#menuHiddenMessage").textContent)});
	
	/*var port = chrome.runtime.connect({name: "camsApp"});
	
	port.postMessage({message: "hi"});
	port.onMessage.addListener(function(msg) {
		if (msg.question == "Who's there?")
			port.postMessage({answer: "Madame"});
	});*/
