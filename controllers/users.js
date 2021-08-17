const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { users: service } = require('../services/');
const { sendMail } = require('../utils');

const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  try {
    const user = await service.getOne({ email });
    if (user) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      })
      return;
    }
    const verificationToken = uuidv4();
    await service.create({ email, password, subscription, verificationToken });
    await sendMail({
      to: email,
      subject: 'Verification token',
      text: ' ',
      html: `<strong>Please click this link to verify your account: http://localhost:3000/api/users/verify/${verificationToken}</strong>`
    });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        email,
        subscription: subscription ?? 'starter',
      }
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await service.getOne({ email });

    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email or password',
      })
    }

    if (!user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'User not verified',
      })
    }

    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY);
    await service.updateById(user._id, { token });
    res.json({
      status: 'success',
      code: 200,
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    })
  } catch (e) {
    next(e);
  }
};

const getCurrent = async (req, res, next) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
      avatarURL,
    }
  })
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    await service.updateById(id, { token: null });
    res.status(204).json({
      status: 'success',
      code: 204,
    });
  } catch (e) {
    next(e);
  }
};

const updateSubscription = async (req, res, next) => {
  const { _id: id, email } = req.user;
  const { subscription } = req.body;
  try {
    await service.updateById(id, { subscription });
    res.json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
      }
    });
  } catch (e) {
    next(e);
  }
}

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;

  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'File is required',
    });
  };
  const pathFile = req.file.path;

  try {
    const avatarURL = await service.updateAvatar(id, pathFile);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      }
    })
  } catch (e) {
    next(e);
  }
}

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await service.getOne({ verificationToken });

    if (!user) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      })
    }

    await service.updateById(user._id, { verificationToken: null, verify: true });
    res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    })
  } catch (e) {
    next(e);
  }
}

const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required field email',
    })
  }

  try {
    const user = await service.getOne({ email });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      })
    }
    
    if (user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has already been passed',
      })
    }

    await sendMail({
      to: email,
      subject: 'Verification token',
      text: ' ',
      html: `<strong>Please click this link to verify your account: http://localhost:3000/api/users/verify/${user.verificationToken}</strong>`
    });
    res.json({
      status: 'success',
      code: 200,
      message: 'Verification email sent',
    })
  } catch (e) {
    next(e);
  }
}

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerificationEmail,
}