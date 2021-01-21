const mongoose = require('./connection');
const RegistrantSchema = new mongoose.Schema({
 regisno: {type:Number, required: true },
 fullname: { type : String, required : true},
 email: { type : String, required : true},
 password: { type : String, required : true},
 contactno: {type: Number, required: true},
 dayCheck: {type: Date, required:true },
 daypayment: {type:Number,required:true, min: 1, max:31  },
status: {type: String, required:true},
desunit: {type: mongoose.Schema.Types.ObjectId, ref: 'units'}


});
RegistrantSchema.plugin(autoIncrement.plugin, {model:'registrants', field:'regisno'});  
const  RegistrantModel = mongoose.model('registrants', RegistrantSchema);
