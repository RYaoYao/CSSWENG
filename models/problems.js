const mongoose = require('./connection');
const ProblemSchema = new mongoose.Schema({
 problemid: {type:Number, required: true },
 problemtype: { type : String, required : true} ,
 problemdesc: {type: String, required: true},
 tenant: {type: mongoose.Schema.Types.ObjectId, ref: 'tenants'},
  status: {type: String, required:true }

});
const  ProblemsModel = mongoose.model('problems', ProblemSchema);

exports.create = function(problemObj, next){
    var problem = new ProblemsModel(problemObj);
    problem.save(function(err,result){
        next(err,result);
    })
}
exports.findByTenant = function(tenantid, next){
    var query =  {tenant:tenantid};
    ProblemsModel.find(query).populate({
        path: 'tenant',
    populate: {path:'unit'} }).exec(function(err,result){
        var problemObj = [];
        result.forEach(element => {
            problemObj.push((element.toObject()));            
        });
        next(problemObj);
    })
}

exports.findAll = function(next){
    ProblemsModel.find({}).populate({
        path: 'tenant',
    populate: {path:'unit'} }).exec(function(err,result){
        var problemObj = [];
        result.forEach(element => {
            problemObj.push((element.toObject()));            
        });
        next(problemObj);
    })
}

exports.Count = function(next){
    ProblemsModel.count({},function(err, result){
        next(result);
    })
}