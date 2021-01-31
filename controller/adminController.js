const tenantModel = require('../models/tenants');
const unitModel = require('../models/unit');
const RegistrantModel = require('../models/registrant');
const problemModel = require('../models/problems');

exports.RegisterList = function(req,res){
  RegistrantModel.All(function(result){
      for(var i=0; i<result.length;i++){
        var temp1 = new Date(result[i].dayCheck);
        result[i].dayCheck = temp1.toDateString();
      }
    res.render('registerlist', {reglist:result});
  })
}

exports.Problemlist = function(req,res){
  problemModel.findAll(function(result){
    res.render('problemlist', {
      problist: result
      });
  })
    
}

exports.CalendarShow = function(req,res){
  tenantModel.findAll(function(result){
    var events = []
    var datel = new Date();
    for (let index = 0; index < result.length; index++) {
      events[index] = {
      title : result[index].unit.unitno,
      start: new Date(datel.setDate(result[index].daypayment)),
      allDay: true
      }
   }
   res.render('calendar', {
    events:events,
    eventJSON: JSON.stringify(events)
   });
    });
  }
   
exports.createunit = function(req,res){
  var unitno = req.body.unitno;
  var size = req.body.size;
  var payment = req.body.payment;
  var status = req.body.status;
  unitModel.create(unitno,size,payment,status,function(err,result){
    if(err)
      console.log(err);
    else
     console.log(result);
  })
}

exports.TenantList = function(req,res){
  tenantModel.findAll(function(result){
    res.render('tenantlist', {tenants:result});
    })
  }
    

exports.home = function(req,res){
  res.render('admin');
}

exports.CreateTenant = function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var contactno = req.body.contactno;
  var daypayment = req.body.daypayment;
  RegistrantModel.findEmail(email,function(result){
    const unitid = result.desunit;
    const password = result.password;

    tenantModel.Create(name,password,email,contactno,daypayment,unitid,function(err,resul){
      if(err){
        console.log(err);
      }
      else{
        console.log(resul);
      }
    })
  })

  RegistrantModel.update(email,"Accepted",function(err4,resu){
  })

}

exports.UpdatetReject = function(req,res){
  var regisno = req.body.regisno;
  var status = req.body.status;
console.log(status);
  RegistrantModel.updatebyReg(regisno,status,function(err,result){
    console.log(result);
  })
}
exports.UpdateTenant = function(req,res){
  var email = req.body.email;
  var contactno = req.body.contactno;
  var daypayment = req.body.daypayment;
  var mosmissed = req.body.mosmissed;
tenantModel.update(email,contactno,daypayment,mosmissed,function(result){
  console.log(result);
});

}