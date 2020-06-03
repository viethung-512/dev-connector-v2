const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.mapped() });
  }

  return next();
};

module.exports = validate;
