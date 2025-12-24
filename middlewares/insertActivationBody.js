const insertActivationBody = (req, res, next) => {
  req.body.isActive = true;
  next();
};

module.exports = insertActivationBody;