
/*
 * GET home page.
 */

var mongoose = require('mongoose');
require('../models/OTPtable');

var OTP=mongoose.model('OTP');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.test = function(req, res){
  res.sendFile('g1.html');
};

exports.sendOTP = function(req, res){
	

	OTP.find({
		mobileNo: req.body.mobileNo,
	}, function(err, data) {
		if (data.length) {
			console.log("hi");
			console.log(data);
			res.json({"result":"otp_already_send"});
		}else{

		
		function randomString(length, chars) {
		    	var result = '';
		    	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
		    	return result;
			}
			var rString = randomString(6, '0123456789');
			var message ="Your high security SecureTM password is "+rString+" .Do not share this with anyone.";
			var runner = require("child_process");
			var argsString = "9039988974,12345678,"+req.body.mobileNo+",'"+message+"'";
			
			runner.exec("php way2sms.php" + " " +argsString, function(err, phpRes, stderr) {
		 		if(err) console.log(err); /* log error */
		 		if(phpRes){
		 			
		 			console.log("success");

		 			req.body.otp=rString;


		 			var otpdata = new OTP(req.body);
			
			
					otpdata.save(function(err) {
						if (err) {
							console.log("ERR in db!!");
							res.json({"result":"database_error"});
							
						} else {
							res.json({"result":"success"});
						}
					});








		 		}else{
		 			res.json({"result":"msg_error"});
		 			console.log("failure");
		 		}
			});





		
		}
		
	});




	
  	
  	
};

exports.verifyOTP = function(req, res){

	OTP.findOne({
		mobileNo: req.body.mobileNo,
		otp: req.body.otp
	}, function(err, data) {
		if (!data) {
			res.json({"result":"failure"});
		}else{

		OTP.remove({
			mobileNo: req.body.mobileNo,
			otp: req.body.otp
		}, function(err) {
    		if (err) {
            	res.json({"result":"remove_msg_failure"});
    		}
    		else {
            	res.json({"result":"success"});
    		}
		});


		
		}
		
	});
  
};













exports.resendOTP = function(req, res){
	

	OTP.findOne({
		mobileNo: req.body.mobileNo,
	}, function(err, data) {
		if (data) {
			var rString=data.otp;
			console.log(data.otp);
			var message ="Your high security SecureTM password is "+rString+" .Do not share this with anyone.";
			var runner = require("child_process");
			var argsString = "9039988974,12345678,"+req.body.mobileNo+",'"+message+"'";
			
			runner.exec("php way2sms.php" + " " +argsString, function(err, phpRes, stderr) {
		 		if(err) console.log(err); /* log error */
		 		if(phpRes){
		 			
		 			console.log("success");

		 			res.json({"result":"success"});







		 		}else{
		 			res.json({"result":"msg_error_resend"});
		 			console.log("failure");
		 		}
			});

			
		}else{

		res.json({"result":"no_otp_to_resend"});
		
			





		
		}
		
	});

}