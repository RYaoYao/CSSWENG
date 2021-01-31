const mongoose = require('./connection');
const adminSchema = new mongoose.Schema({
 email: {type: String, required: true },
 pass: { type : String, required : true},
 name: {type: String}

});
const  adminModel = mongoose.model('admins', adminSchema);

exports.findEmail = function(email,next){
    var query = {email:email};
    adminModel.findOne(query).exec(function(err,result){
        next(result);
    })
}