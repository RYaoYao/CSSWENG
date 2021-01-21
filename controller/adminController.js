const tenantModel = require('../model/tenants');
const unitModel = require('../model/unit');


exports.RegisterList = function(req,res){
    res.render('registerlist', {
        reglist:[
          { Name:"Kimberly Yao", email:"kimberlyao@gmail.com",contact:"09064515880",UnitNo:"1004", DayChecking:"January 30, 2020", iday:"30", status:"Pending"},
          {Name:"Charlene Yao", email:"charleneyaoo@dlsu.edu.ph",contact:"09064515880",UnitNo:"1005", DayChecking:"January 30, 2020",  iday:"30",status:"Pending"}
        ]});
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
    res.render('tenantlist', {
        tenants:[
          {UnitNo:"1004",Name:"Ryan Yao", email:"ryan_yao@dlsu.edu.ph",contact:"09064515880",daypayment:"7th", Rent:"5000", Momis:"2"},
          {UnitNo:"1005",Name:"Ronald Yao", email:"ronaldyao@gmail.com",contact:"09065615778",daypayment:"15th", Rent:"3000", Momis:"3"}
        ]});
}


exports.home = function(req,res){
  res.render('admin');
}