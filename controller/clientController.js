const problemModel = require('../model/problems');
const unitModel = require('../model/unit');
const RegistrantModel = require('../model/registrant');


exports.Report = function(req,res){
    res.render('user_problem', {active:{active_problem: true}});
}

exports.ReportList = function(req,res){
    res.render('CheckStatus', {active:{active_problem: true}});
}