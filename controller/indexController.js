const unitModel = require('../model/unit');
const RegistrantModel = require('../model/registrant');
const TenantModel = require('../model/tenants');
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
            TenantModel.findEmail(req.body.email, function(err, result){
                if(result){
                    req.flash('error_msg', 'You are already a tenant. Please login to you account');
                    res.redirect('/login');
                }
                else{
                    RegistrantModel.Count(function(result){
                        const count = result;
                        unitModel.find(req.body.desunit, function(resq){
                            const unitid= resq._id;
                            bcrypt.hash(req.body.password,10,(err,hashed) =>{
                                const newReg = {
                                    regisno: count,
                                    fullname: req.body.fullname,
                                    email: req.body.email,
                                    password: (req.body.password. hashed),
                                    contactno: req.body.contactno,
                                    dayCheck:req.body.dayCheck,
                                    daypayment:req.body.daypaymen,
                                    desunit: unitid,
                                    status: req.body.status,
                                }
                            })
                            RegistrantModel.Create(newReg,function(err,result){
                                    if(err)
                                        console.log(err);
                                    else
                                        console.log(result);
                                });
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
      const { email, password } = req.body;

if(email == "admin@gmail.com" && password == "password123!"){
    console.log("in here");
    req.session.user = "admin";
    req.session.name = "admin";
    res.redirect('/admin/');
}else{
      TenantModel.findEmail(email, (err, user) => {
        if (err) {
          // Database error occurred...
          req.flash('error_msg', 'Something happened! Please try again.');
          res.redirect('/login');
        } else {
          // Successful query
          if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              // passwords match (result == true)
              if (result) {
                // Update session object once matched!
                req.session.user = user._id;
                req.session.name = user.name;

                res.redirect('/ProfileInfo');

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