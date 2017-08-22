var win=document.getElementById("SecureTM_window");
var sta=document.createElement("div");
var inp =document.createElement("input");
var btn =document.createElement("button");
var t = document.createTextNode("Send OTP");
var loader =document.createElement("div");
var inp1 =document.createElement("input");
var btn1 =document.createElement("button");
var t1 = document.createTextNode("Verify OTP");
var label1=document.createElement("label");
var logo=document.createElement("div");
var nextline=document.createElement("br");
var sta1=document.createElement("div");


var resendtext=document.createElement("div");
var resendbutton=document.createElement("button");
var resendbuttontext=document.createTextNode("Resend OTP");
resendbutton.appendChild(resendbuttontext);
resendbutton.className="btn btn-success resendbutton";
resendtext.className="resendtext";
resendtext.innerHTML="an OTP has already been sent to this mobile no.";

logo.innerHTML='powered by <a href="http://52.36.24.247/#" style="color:#3BB9FF;">SecureTM</a>';

win.appendChild(logo);
win.appendChild(sta1);

loader.className = "securetm_modal";
sta.className="securetm_status";
sta1.className="securetm_status1";
label1.className="securetm_inputlabel";
inp.className="securetm_inputbox";
inp1.className="securetm_inputbox"
btn.className="securetm_submitbutton";
btn.className += " btn btn-success";
btn1.className="securetm_submitbutton";
btn1.className += " btn btn-success";
logo.className="securetm_logo";


function init(){
	win.appendChild(sta1);
	win.appendChild(label1);
	label1.innerHTML="Enter your mobile no."
	btn.appendChild(t);  
	win.appendChild(inp);
	win.appendChild(nextline);
	win.appendChild(btn);
	
}

function initCSS(){
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://52.36.24.247/stylesheets/securetm.css';
    link.media = 'all';
    head.appendChild(link);

    var link1  = document.createElement('link');
    link1.rel  = 'stylesheet';
    link1.type = 'text/css';
    link1.href = 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
    link1.media = 'all';
    head.appendChild(link1);
    init();


}

btn.addEventListener("click", requestOTP);

var mobileNo=null;

function onRequestOTP(){
	sta.innerHTML="sending OTP...";
	win.removeChild(inp);
    win.removeChild(btn);
    win.removeChild(label1);
    win.removeChild(nextline);
    win.removeChild(sta1);
    win.appendChild(sta);
    win.insertBefore(loader,sta);
}


function requestOTP(){
	onRequestOTP();

	mobileNo=inp.value;
	var http = new XMLHttpRequest();
	var url = "http://52.36.24.247/SecureTM/sendOTP";
	var params = "mobileNo="+mobileNo;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
    	if(http.readyState == 4 && http.status == 200) {
    		
    		//sta.innerHTML=xhr.responseText;
        	var response = JSON.parse(http.responseText);
        	if(response.result=="success"){
        		sta1.innerHTML="an OTP has been sent to your mobile no.";
				sta1.style.color="green";
				win.appendChild(sta1);
        		onOTPreceived();
        	}
        	else if(response.result=="msg_error"){
        		sta1.innerHTML="sending OTP failed. please try again.";
        		sta1.style.color="red";
        		win.removeChild(loader);
				win.removeChild(sta);
        		init();
        	}
        	else if(response.result=="otp_already_send"){
        		win.removeChild(loader);
				win.removeChild(sta);
				win.appendChild(resendtext);
				win.appendChild(resendbutton);
				resendbutton.addEventListener("click",resendOTP);
        	}
        	
    	}
	}
	http.send(params);
}

function resendOTP(){
	win.removeChild(resendtext);
	win.removeChild(resendbutton);
	sta.innerHTML="sending OTP...";
	win.appendChild(sta);
    win.insertBefore(loader,sta);
	
	mobileNo=inp.value;
	var http = new XMLHttpRequest();
	var url = "http://52.36.24.247/SecureTM/resendOTP";
	var params = "mobileNo="+mobileNo;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
    	if(http.readyState == 4 && http.status == 200) {
    		
    		//sta.innerHTML=xhr.responseText;
        	var response = JSON.parse(http.responseText);
        	if(response.result=="success"){
        		sta1.innerHTML="the OTP has been resent";
				sta1.style.color="green";
				win.appendChild(sta1);
        		onOTPreceived();
        	}
        	else if(response.result=="msg_error_resend"){
        		sta1.innerHTML="sending OTP failed. please try again.";
        		sta1.style.color="red";
        		win.removeChild(loader);
				win.removeChild(sta);
        		init();
        	}
        	
    	}
	}
	http.send(params);
}


function onOTPreceived(){
	win.removeChild(loader);
	win.removeChild(sta);
	win.appendChild(label1);
	label1.innerHTML="Enter OTP"
	btn1.appendChild(t1);  
	win.appendChild(inp1);
	win.appendChild(nextline);
	win.appendChild(btn1);
	btn1.addEventListener("click", verifyOTP);
}

function verifyOTP(){
	onVerifyOTP();

	var otp=inp1.value;
	var http = new XMLHttpRequest();
	var url = "http://52.36.24.247/SecureTM/verifyOTP";
	var params = "mobileNo="+mobileNo+"&otp="+otp;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
    	if(http.readyState == 4 && http.status == 200) {
    		
    		var response = JSON.parse(http.responseText);
        	if(response.result=="success"){
        		cleardom();
        		onSuccess();
        		on_securetm_otp_verify_success();
        	}
        	else if(response.result=="failure"){
        		sta1.innerHTML="wrong OTP! please try again.";
        		sta1.style.color="red";
        		win.appendChild(sta1);
        		onOTPreceived();
        	}
        	
    	}
	}
	http.send(params);
}

function onVerifyOTP(){
	sta.innerHTML="verifying OTP...";
	win.removeChild(inp1);
    win.removeChild(btn1);
    win.removeChild(label1);
    win.removeChild(nextline);
    win.removeChild(sta1);
    win.appendChild(sta);
    win.insertBefore(loader,sta);
}

function cleardom(){
	win.removeChild(loader);
	win.removeChild(sta);
}

function onSuccess(){
	var congrats=document.createElement("h3");
	congrats.className="congrats";
	congrats.innerHTML="Congratulations! your mobile no. has been successfully verified.";
	win.appendChild(congrats);
}

/*function on_securetm_otp_verify_success(){

}*/

initCSS();
