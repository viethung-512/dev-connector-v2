const firebaseAdmin = require('../utils/firebaseAdmin');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const firebaseConfig = require('../../config/firebaseConfig');
const { responseMessage } = require('../utils/constants');
const { generateImageFileName, getDownloadUrl } = require('../utils/helper');

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

const collectObjectField = async (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  let imageToBeUpload = {};
  req.object = {};

  busboy.on('field', (fieldname, val) => {
    req.object[fieldname] = val;
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const imageFileName = generateImageFileName(filename);
    const filepath = path.join(os.tmpdir(), imageFileName);

    imageToBeUpload = { filepath, mimetype, imageFileName };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', async () => {
    if (imageToBeUpload.imageFileName) {
      const uploadPath =
        req.type === 'user' ? `users/${req.user.id}` : `${req.type}s`;

      await firebaseAdmin
        .storage()
        .bucket(firebaseConfig.storageBucket)
        .upload(imageToBeUpload.filepath, {
          destination: `${uploadPath}/${imageToBeUpload.imageFileName}`,
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUpload.mimetype,
            },
          },
        });

      const imageUrl = getDownloadUrl(
        `${uploadPath}`,
        imageToBeUpload.imageFileName
      );
      req.object.imageUrl = imageUrl;

      return next();
    }

    return next();
  });

  req.pipe(busboy);
};

const setObjectType = (req, res, next) => {
  const baseUrl = req.baseUrl;
  const type = baseUrl.split('/')[2];

  if (type === 'profile') {
    req.type = 'user';
  } else {
    req.type = type;
  }

  return next();
};

module.exports = { errorHandle, collectObjectField, setObjectType };
