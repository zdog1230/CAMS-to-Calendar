function postRequest(){
	$.post("http://159.203.93.15:3000/submit", {
    json_string: JSON.stringify({name:"John", phone number:"+410000000"})
});
}