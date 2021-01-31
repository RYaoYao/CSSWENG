exports.isPrivate = (req, res, next) => {
    // Must be authenticated to go to the next function
    if (req.session.tenant) {
      return next()
    }else if (req.session.admin){
      res.redirect('/admin/');
    } else {
      res.redirect('/home');
    }
  };
  exports.isPrivateAdmin =  (req,res,next) => {
    if (req.session.admin) {
      return next()
    } else if(req.session.tenant){
      res.redirect('/user/');
    }
    else
      res.redirect('/');
  }
  exports.isPublic = (req, res, next) => {
    // If authenticated, go to home page
    console.log(req.session);
    if(req.session.tenant){
      res.redirect('/user/')
    }else if(req.session.admin){
      res.redirect('/admin/');
    }  else {
      return next();
    }
  } 