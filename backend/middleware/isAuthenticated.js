
export default function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
