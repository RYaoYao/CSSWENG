const unitModel = require('../model/unit');

exports.UnitList = function(req,res){
    unitModel.findAvailable(function(result){
        res.render('register',{units : result});
    });
}