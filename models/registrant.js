const mongoose = require('./connection');
const RegistrantSchema = new mongoose.Schema({
 regisno: {type:Number, required: true },
 fullname: { type : String, required : true},
 email: { type : String, required : true},
 password: { type : String, required : true},
 contactno: {type: String, required: true},
 dayCheck: {type: Date, required:true },
 daypayment: {type:Number,required:true, min: 1, max:31  },
status: {type: String, required:true},
desunit: {type: mongoose.Schema.Types.ObjectId, ref: 'units',}


});
const  RegistrantModel = mongoose.model('registrants', RegistrantSchema);


exports.Count = function(next){
    RegistrantModel.find({}).sort({_id:-1}).limit(1).exec(function(err,result){
        next(result);
    })
}

exports.Create = function(objs, next){
        var reg = new RegistrantModel(objs);
    reg.save(function(err,result){
        next(err,result);
    })
}

exports.All = function(next){
    RegistrantModel.find({}).populate('desunit').exec(function(err,result){
        var regObj = [];
        result.forEach(element => {
            regObj.push(element.toObject());
        });
        next(regObj);
    })
}

exports.findEmail = function(email, next){
    var query = {email:email};
    RegistrantModel.findOne(query).exec(function(err, result){
        if (err) throw err;
        next(result);
    })
}

exports.update = function(email, status, next){
   RegistrantModel.findOne({email:email}).exec(function(err,result){
        result.status = status;
        result.save(function(err2,res){
            next(err2,res);
        })
    })
}

exports.updatebyReg = function(regisno, status, next){
    RegistrantModel.findOne({regisno:regisno}).exec(function(err,result){
         result.status = status;
         result.save(function(err2,res){
             next(err2,res);
         })
     })
 }