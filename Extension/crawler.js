
var rawData = [];
var startEnd = [];

var crawlFunct = function(){
	
	var scheduleURL = "https://cams.floridapoly.org/Student/cePortalMatrixSchedule.asp";
	var i = 0;
	var stop;
	var done = false;
	
	$.ajax(
	{ 
		type: "GET",   
		url: scheduleURL,   
		success : function(text)
		{
			$(document).ready(function() {
				$('#scheduleData').append("<span>"+text+"</span>");
				$('#scheduleData').on('click', function() {
					var x = this.getElementsByTagName("TD");
					//myDiv = x;
					console.log("check");
					for(i = 0; i < x.length; i++){
						x[i].textContent = x[i].textContent.trim();
						if(x[i].textContent.length == 3 && !done){
							stop = i;
							done = true;
						}
					}
					//myDiv.splice(0,stop);
					//x = myDiv;
					for(i = stop; i < x.length; i++){
						rawData[i-stop] = x[i].textContent;
						if(rawData[i-stop] == "")
							rawData[i-stop] = rawData[i-stop-11];
					}
					console.log("check");
				});
			});
		}
	});
	
};

var getDates = function(){
	
	var startEndDatesURL = "https://cams.floridapoly.org/Student/cePortalOffering.asp";
	var i;
	
	
	$.ajax(
	{ 
		type: "GET",   
		url: startEndDatesURL,   
		success : function(text)
		{
			$(document).ready(function() {
				$('#dateData').append("<span>"+text+"</span>");
				$('#dateData').on('click', function() {
					startEnd[0] = this.getElementsByTagName("TD")[3].textContent.trim();
					startEnd[1] = this.getElementsByTagName("TD")[4].textContent.trim();
					console.log("check");
				});
			});
		}
	});
	
};

// Global reference to the status display SPAN
var newArray = new Array();
var serverURL = 'http://localhost:8080';
// POST the data to the server using XMLHttpRequest
function sendPost() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = serverURL+'/post';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);
    
    // Prepare the data to be POSTed by URLEncoding each field's contents
    var params = "lorem=ipsum&name=["+newArray.toString()+"]";

    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Handle request state change events
    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
				var newURL = serverURL+'/post/'+xhr.responseText;
				chrome.tabs.create({ url: newURL });
            } else {
                // Show what went wrong
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

var myB = document.getElementById("import");
myB.onclick = function(){
	$('#scheduleData').trigger('click');
	$('#dateData').trigger('click');
	console.log("check");
	if((rawData.length != 0) && (startEnd.length != 0)){
		var i;
		for(i = 0; i < rawData.length; i++){
				if(i % 11 ==  0){
					newArray.push(startEnd[0]);
					newArray.push(startEnd[1]);
				} newArray.push(rawData[i]);
		}
		sendPost();
		//document.getElementById("arrayStr").textContent = newArray.toString();
	} else {
		console.log("have yet to collect data");
	}
	
};

crawlFunct();
getDates();