exports.isPrivate = (req, res, next) => {
    // Must be authenticated to go to the next function
    if (req.session.user || req.sesion.user == "admin") {
      return next()
    } else {
      res.redirect('/home');
    }
  };
  
  exports.isPublic = (req, res, next) => {
    // If authenticated, go to home page
    if(req.sesion.user){
      res.redirect('/')
    }else {
      return next();
    }
  } 