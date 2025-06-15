module.exports = function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.email === "admin@gmail.com") {
    return next();
  }
  return res.status(403).send("Access denied. Admins only.");
};
