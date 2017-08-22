The server has been closed. We are sorry for inconvinience. Feel free to contact us for more details.
#SecureTM API server http://52.36.24.247/#

#SecureTM:#
SecureTM is a fast and secure way for developers to implement mobile number verification functionality in their websites for better authentication of users.

#Live demo:#
The **API server is live** at a linux virtual machine on amazon EC2.
check out this link for quick demo:
     http://52.36.24.247/

#How to set up:#

```
<div id="SecureTM_window"></div>
<script type="text/javascript"  src="http://52.36.24.247/javascripts/g1.js"></script>
```


**Adding this two lines of code is all you need to setup SecureTM.**
To test this yourself, first create a web server in any platform of your choice and add the above code to required html file.
###Warning:###
It is important to create a server, because XmlHttpRequests wont work with file protocol.

#How does SecureTM work?#
The SecureTM script automatically inject the code in the given html div tag and makes xmlHttpRequests to the server API on user interaction. Internally, SecureTM uses [way2sms](http://way2sms.com/) site for sending otp sms.

###API:###

POST request to http://52.36.24.247/SecureTM/sendOTP
with mobileNo=xxxxxxxxxx for sending OTP.

POST request to http://52.36.24.247/SecureTM/resendOTP
with mobileNo=xxxxxxxxxx for resending OTP.

POST request to http://52.36.24.247/SecureTM/verifyOTP
with mobileNo=xxxxxxxxxx & otp=xxxxxx for verifying OTP.

The response is returned in JSON format.

Mongodb database is used at the server for storing otp - mobile no. pair.

The requests and responses are managed by the [SecureTM script](http://52.36.24.247/javascripts/g1.js).

On successful verification,**on_securetm_otp_verify_success()** callback is called.



#Contact:#
* **Akash Gupta**       akash.gupta.cse14@itbhu.ac.in
* **Hemanshu Sondhi**   hemanshu.sondhi.cse14@itbhu.ac.in
* **Gaurav Gupta**      gaurav.gupta.cse14@itbhu.ac.in       +917860931204
