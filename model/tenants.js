const mongoose = require('./connection');
const TenantSchema = new mongoose.Schema({
    username:  { type : String, required : true},
    password: { type : String, required : true},
    email: { type : String, required : true},
    contactno: {type:Number, required: true},
    daypayment: {type:Number, required: true},
    mosmissed: {type:Number, required: true},
    unit: {type: mongoose.Schema.Types.ObjectId, ref: 'units'}
});

const tenantmodel = mongoose.model('tenants', TenantSchema);
