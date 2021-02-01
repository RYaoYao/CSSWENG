const mongoose = require('./connection');
const TenantSchema = new mongoose.Schema({
    name:  { type : String, required : true},
    password: { type : String, required : true},
    email: { type : String, required : true},
    contactno: {type:String, required: true},
    daypayment: {type:Number, required: true},
    mosmissed: {type:Number, required: true},
    unit: {type: mongoose.Schema.Types.ObjectId, ref: 'units'},

});

const tenantmodel = mongoose.model('tenants', TenantSchema);

exports.Create = function(name,password,email,contactno,daypayment,unit,next){
    var tenant = new tenantmodel({
        name: name,
        password: password,
        email: email,
        contactno: contactno,
        daypayment: daypayment,
        mosmissed: 0,
        unit: unit
    })
    tenant.save(function(err,result){
        next(err,result);
    })

}

exports.findAll = function(next){
    tenantmodel.find({}).populate('unit').exec(function(err,result){
        var tenObj = [];
        result.forEach(element => {
            tenObj.push(element.toObject());
        });
        next(tenObj);
    })
}

exports. findID = function(ID,next){
    var query = {_id:ID };
    tenantmodel.findOne(query).populate('unit').exec(function(err,result){
        next(err,result);
    })
}

exports.findEmail = function(email,next){
    var query = {email:email};
    tenantmodel.findOne(query).exec(function(err, result){
        next(err, result);
    })
}

exports.update = function(email,contactno,daypayment,mosmissed,next){
    var query = {email:email};
    tenantmodel.findOne(query).exec(function(err, result){
        result.contactno = contactno;
        result.daypayment = daypayment;
        result.mosmissed = mosmissed;
        result.save(function(err2,res){
                next(res);
        })
      
    })
}

exports.find2  = function(unitid,next){
    var query = {unit:unitid};
    tenantmodel.findOne(query).exec(function(err,result){
            next(result);
        });

}

exports.delete = function(tenantid,next){
    tenantmodel.deleteOne({_id:tenantid},function(err,res){
        if(err) throw err;
        next(res);
    })

    
}