const problemModel = require('../models/problems');
const unitModel = require('../models/unit');
const RegistrantModel = require('../models/registrant');


exports.Report = function(req,res){
    res.render('user_problem', {active:{active_problem: true}});
}

exports.ReportList = function(req,res){
    res.render('CheckStatus', {
      unitprob: [{probtype:"Plumbing",   problemdes:"Clogged Faucet" ,  probstatus: "Contacting "},
      {probtype:"Others",   problemdes:"Gas Leak" ,  probstatus: "Sent to Owner"} ],
      active:{active_problem: true}});
}


exports.ShowInfo = function(req,res){
    res.render('info', {
      active:{active_info: true}});
}