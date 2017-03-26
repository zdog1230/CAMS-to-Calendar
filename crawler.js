
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

var myB = document.getElementById("import");
myB.onclick = function(){
	$('#scheduleData').trigger('click');
	$('#dateData').trigger('click');
	console.log("check");
	var newArray = new Array();
	if((rawData.length != 0) && (startEnd.length != 0)){
		var i;
		for(i = 0; i < rawData.length; i++){
				if(i % 11 ==  0){
					newArray.push(startEnd[0]);
					newArray.push(startEnd[1]);
				} newArray.push(rawData[i]);
		}
		document.getElementById("arrayStr").textContent = newArray.toString();
	} else {
		alert("have yet to collect data");
	}
	
};

crawlFunct();
getDates();