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
    var resu;
    if(err)
    {
     resu = {success: false, message:"Unit was not created"}
    res.send(resu)
  }
    else
     {
   resu = {success:true, message:"Unit successfully created!"}
    res.send(resu);
    }
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
tenantModel.findEmail(email,function(err,result){
  var resu;
  if(result){
    resu = {success: false, message:"This registrant is already a tenant"}
        res.send(resu)
  }else{
    tenantModel.Create(name,password,email,contactno,daypayment,unitid,function(err,resul){
      RegistrantModel.update(email,"Accepted",function(err4,rest){
      })
      unitModel.update2(unitid,function(erroridk,rest2){

      })
      var resu;
      if(err){
        resu = {success: false, message:"Tenant was not created"}
        res.send(resu)
      }
      else{
        resu = {success:true, message:"Tenant successfully created!"}
        res.send(resu);
      }
    })
  }
})
    
  })
 

}

exports.UpdatetReject = function(req,res){
  var regisno = req.body.regisno;
  var status = req.body.status;
console.log(status);
  RegistrantModel.updatebyReg(regisno,status,function(err,result){
    var resu
    if(err){
      resu = {success:false, message:"Update was not successful!"};
    res.send(resu);
    }else {
      resu = {success:true, message:"Update Success!"};
    res.send(resu);
    }
  })
}
exports.UpdateTenant = function(req,res){
  var email = req.body.email;
  var contactno = req.body.contactno;
  var daypayment = req.body.daypayment;
  var mosmissed = req.body.mosmissed;
tenantModel.update(email,contactno,daypayment,mosmissed,function(result){
  var resu;
  if(result){
    resu = {success:true, message:"Update Success"}
    res.send(resu);
  }
  else{
    resu = {success:false, message:"Update was not successful!"};
    res.send(resu);
  }
});

}
exports.UpdateProblem = function(req,res){
  var problemid = req.body.problemid;
  var status = req.body.status;
 
        problemModel.Update(problemid, status,function(result2){
          var resu;
          if(result2){
            resu = {success:true, message:"Update Success"}
            res.send(resu);
          }
          else{
            resu = {success:false, message:"Update was not successful!"};
            res.send(resu);
          }
        });
    
}

exports.deleteone = function(req,res){
 
  tenantModel.findEmail(req.body.email, function(err,result){

      problemModel.deleteProblems(result._id, function(result2){
        unitModel.update(result.unit,function(result4){
          console.log(result4);
        })
          tenantModel.delete(result._id,function(result3){
            var resu;
            if(result3){
              resu = {success:true, message:"Delete Successful"}
              res.send(resu);
            }
            else{
              resu = {success:false, message:"Delete was not successful!"};
              res.send(resu);
          }
      }); 
  });
});
}

exports.deleteproblem = function(req,res){
  var problemid = req.body.problemid 
  problemModel.deleteOne(problemid,function(result){
    var resu;
    if(result){
      resu = {success:true, message:"Delete Successful"}
      res.send(resu);
    }
    else{
      resu = {success:false, message:"Delete was not successful!"};
      res.send(resu);
  }
  })
}