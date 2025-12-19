
const parseStringFields = (req, res, next) => {
  if (typeof req.body.ingredients === 'string') {
    req.body.ingredients = JSON.parse(req.body.ingredients)
  }
  if (typeof req.body.size === 'string') {
    req.body.size = JSON.parse(req.body.size)
  }
  
  next();
};


module.exports = parseStringFields;
