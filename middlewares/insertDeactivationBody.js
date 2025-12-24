const insertDeactivationBody = (req, res, next) => {
  req.body.isActive = false;
  next();
};

module.exports = insertDeactivationBody;
