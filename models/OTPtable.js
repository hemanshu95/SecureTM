var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OTPSchema = new Schema({

	mobileNo:{
		type:String,
		default: '',
		trim:true
	},

	otp:{
		type:String,
		default: '',
		trim:true
	},

	created: {
		type: Date,
		default: Date.now
	}

});

mongoose.model('OTP', OTPSchema);