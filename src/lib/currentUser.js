// Middleware to expose `req.user` as `currentUser` in views
export default (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
}
