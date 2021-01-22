const mongoose = require('./connection');
const TenantSchema = new mongoose.Schema({
    name:  { type : String, required : true},
    password: { type : String, required : true},
    email: { type : String, required : true},
    contactno: {type:Number, required: true},
    daypayment: {type:Number, required: true},
    mosmissed: {type:Number, required: true},
    unit: {type: mongoose.Schema.Types.ObjectId, ref: 'units'}
});

const tenantmodel = mongoose.model('tenants', TenantSchema);

exports.Create = function(name,password,email,contactno,daypayment,unit,next){
    var tenant = new tenantmodel({
        name: name,
        password: password,
        email: email,
        contactno: contactno,
        daypayment: daypayment,
        mostmissed: 0,
        unit: unit
    })
    tenant.save(function(err,result){
        next(err,result);
    })

}