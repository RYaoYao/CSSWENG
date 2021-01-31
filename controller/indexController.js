const unitModel = require('../models/unit');
const RegistrantModel = require('../models/registrant');
const TenantModel = require('../models/tenants');
const adminModel = require('../models/admins');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.UnitList = function(req,res){
    unitModel.findAvailable(function(result){

        res.render('register',{units : result});
    });
}

exports.CreateRegistrant = function(req,res){
    RegistrantModel.findEmail(req.body.email, function(result){
        if(result){
            req.flash('error_msg', 'You have already registered for one unit. Please wait for landlord response.');
            res.redirect('/home');
        }else{
            TenantModel.findEmail(req.body.email, function(err, result4){
                if(result4){
                    req.flash('error_msg', 'You are already a tenant. Please login to you account');
                    res.redirect('/login');
                }
                else{
                    RegistrantModel.Count(function(result2){
                      var count = 1;
                      if(result2[0] != null)
                         {count = parseInt(result2[0].regisno) + 1;}
                        

                        unitModel.find(req.body.desunit, function(resq){
                            const unitid= resq._id;
                            bcrypt.hash(req.body.password,10,(err3,hashed) =>{
                                const newReg = {
                                    regisno: count,
                                    fullname: req.body.fullname,
                                    email: req.body.email,
                                    password: (req.body.password, hashed),
                                    contactno: req.body.contactno,
                                    dayCheck:req.body.dayCheck,
                                    daypayment:req.body.daypayment,
                                    desunit: unitid,
                                    status: req.body.status,
                                }
                                RegistrantModel.Create(newReg,function(err2,result3){
                                  if(err2)
                                      console.log(err2);
                                  else
                                      console.log(result3);
                              });
                            })
                          
                        })
                    });
                }
            })
        }

});
}

exports.loginUser = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email, pass } = req.body;
      console.log(pass);
      console.log(email == "admin@gmail.com" && pass == "password123!");
if(email === "admin1@gmail.com" && pass === "password123!"){
    adminModel.findEmail(email,function(result){
      console.log(result);
      req.session.admin = result._id;
      req.session.name = result.name;
      res.redirect('/admin/');
    });
    
}else{
      TenantModel.findEmail(email, (err, user) => {
        if (err) {
          // Database error occurred...
          req.flash('error_msg', 'Something happened! Please try again.');
          res.redirect('/login');
        } else {
          // Successful query
          if (user) {
            
            bcrypt.compare(pass, user.password, (err, result) => {
              // passwords match (result == true)
              if (result) {
                // Update session object once matched!
                req.session.tenant = user._id;
                req.session.name = user.name;

                res.redirect('/user/');

              } else {
                // passwords don't match
                req.flash('error_msg', 'Incorrect Credentials. Please try again.');
                res.redirect('/login');
              }
            });
          } else {
            // No user found
            req.flash('error_msg', 'No such user. Please register first!');
            res.redirect('/login');
          }
        }
      });
    }
    } else {
      const messages = errors.array().map((item) => item.msg);
    
      req.flash('error_msg', messages.join(' '));
      res.redirect('/login');
    }
    };
    
    exports.logoutUser = (req, res) => {
      if (req.session) {
        req.session.destroy(() => {
          res.clearCookie('connect.sid');
          res.redirect('/home');
        });
      }
    };