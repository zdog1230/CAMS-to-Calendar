

window.onload = function() {
	
	y = document.getElementById("crawl");
	"https://cams.floridapoly.org/Student/cePortalMatrixSchedule.asp"
	console.log("crawler start, file path: ");
	console.log(chrome.runtime.getURL("crawler.js"));
	
	chrome.runtime.onConnect.addListener(
		function(port) {
			console.log("beginning connection");
			console.assert(port.name == "camsApp");
			console.log("port asserted");
			port.onMessage.addListener(
				function(msg) {
					console.log("setting up onmessage listener");
					if (msg.message = "hi"){
						port.postMessage({answer: "Madame"});
						y.innerHTML = "<p>message passed</p>";
					}
				}
			);
		}
	);
	
	/*"matches": ["https://cams.floridapoly.org/*"],
		"exclude_matches": ["https://cams.floridapoly.org/student/login.asp"],*/
	
	
}