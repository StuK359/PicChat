module.exports = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    // Redirect to login if user is not already logged in
    res.redirect('/auth/google');
  };
  