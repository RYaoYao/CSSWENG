const tenantModel = require('../model/tenants');
const unitModel = require('../model/unit');
const RegistrantModel = require('../model/registrant');

exports.RegisterList = function(req,res){
  RegistrantModel.All(function(result){
      for(var i=0; i<result.length;i++){
        var temp1 = new Date(result[i].dayCheck);
        result[i].dayCheck = temp1.toDateString();
      }
      console.log(result);
    res.render('registerlist', {reglist:result});
  })
}

exports.Problemlist = function(req,res){
    res.render('problemlist', {
        problist:[
          { probid:"0001", unitno:"1005",probtype:"Plumbing",problemdes:"Water not falling down", probstatus:"Contacting.."}
      
        ]});
}

exports.CalendarShow = function(req,res){
    res.render('calendar', {
     
    });
}
exports.createunit = function(req,res){
  console.log(req.body);
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
  console.log(contactno);
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

  RegistrantModel.update(email,"Approved",function(err4,resu){
    console.log("goods");
  })

}