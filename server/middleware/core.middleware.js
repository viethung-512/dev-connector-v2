const { responseMessage } = require('../utils/constants');

const errorHandle = (err, req, res, next) => {
  const { status, message } = err;

  switch (status) {
    case 400:
      return res.status(status).json({
        error: {
          general: {
            msg: message || responseMessage.STATUS_400,
          },
        },
      });
    case 401:
      return res.status(status).json({
        error: {
          general: {
            msg: message || responseMessage.STATUS_401,
          },
        },
      });
    case 403:
      return res.status(status).json({
        error: {
          general: {
            msg: message || responseMessage.STATUS_403,
          },
        },
      });
    case 404:
      return res.status(status).json({
        error: {
          general: {
            msg: message || responseMessage.STATUS_404,
          },
        },
      });
    case 500:
      return res.status(status).json({
        error: {
          general: {
            msg: message || responseMessage.STATUS_500,
          },
        },
      });
    default:
      return res.status(500).json({
        error: {
          general: {
            msg: message || responseMessage.STATUS_500,
          },
        },
      });
  }
};

module.exports = { errorHandle };
