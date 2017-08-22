var win=document.getElementById("SecureTM_window");
var sta=document.createElement("div");
var inp =document.createElement("input");
var btn =document.createElement("button");
var t = document.createTextNode("Submit");

win.appendChild(sta);
btn.appendChild(t);  
win.appendChild(inp);
win.appendChild(btn);

btn.addEventListener("click", requestOTP);

var mobileNo=null;

function requestOTP(){
	mobileNo=inp.value;
	win.removeChild(inp);
    win.removeChild(btn);
	sta.innerHTML="sending OTP...";
	var http = new XMLHttpRequest();
	var url = "http://localhost:3000/SecureTM/sendOTP";
	var params = "mobileNo="+mobileNo;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
    	if(http.readyState == 4 && http.status == 200) {
        	var response = JSON.parse(xhr.responseText);
        	alert(response.result);
        	sta.innerHTML="an OTP has been sent to your mobile no."
    	}
	}
	http.send(params);
}