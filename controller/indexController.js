const unitModel = require('../model/unit');
const RegistrantModel = require('../model/registrant');
exports.UnitList = function(req,res){
    unitModel.findAvailable(function(result){

        res.render('register',{units : result});
    });
}

exports.CreateRegistrant = function(req,res){
    RegistrantModel.Count(function(result){
        const count = result;
        unitModel.find(req.body.desunit, function(resq){
            const unitid= resq._id;
            console.log(unitid);
            RegistrantModel.Create(count,req.body.fullname,req.body.email,req.body.password,
                req.body.contactno,req.body.dayCheck
                ,req.body.daypayment,unitid,req.body.status,function(err,result){
                    if(err)
                        console.log(err);
                    else
                        console.log(result);
                });
        })
    });
}