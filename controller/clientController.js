const problemModel = require('../models/problems');
const unitModel = require('../models/unit');
const RegistrantModel = require('../models/registrant');
const tenantmodel = require('../models/tenants');

exports.Report = function(req,res){
    res.render('user_problem', {active:{active_problem: true}});
}

exports.ReportList = function(req,res){
  problemModel.findByTenant(req.session.tenant,function(result){
    res.render('CheckStatus', {
      unitprob: result,
      active:{active_problem: true}});
  })
}


exports.ShowInfo = function(req,res){
  tenantmodel.findID(req.session.tenant, function(err,result){
    res.render('info', {
      tenant: result,
      active:{active_info: true},});
  })
    
}

exports.createProblem = function(req,res){
  var problemtype = req.body.problemtype;
  var problemdesc = req.body.problemdesc;
  var status =  req.body.status;
  var tenant = req.session.tenant;
  problemModel.Count(function(result){
    var count;
    if(result)
      { count = parseInt(result[0].problemid) +1;}
      else{
          count = 1;
      }
      const newProblem = {
        problemid: count,
        problemtype: problemtype,
        problemdesc: problemdesc,
        tenant:tenant,
        status:status
      }
      problemModel.create(newProblem,function(err,resul){
        var resu
        if(err)
          {
            resu = {success:false, message:"Error occured while reporting the problem. Please contact landlord"}
            res.send(resu);
          }
        else
         {
          resu = {success:true, message:"We have successfully reported your problem!"};
          res.send(resu);
         }
      })
  })
}