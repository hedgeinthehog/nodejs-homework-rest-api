const jwt = require('jsonwebtoken');
require('dotenv').config();
const { users: service } = require('../services/');

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
    await service.create({ email, password, subscription });
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
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email or password',
      })
    }

    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY);
    await service.updateById(user._id, {token});
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
  const { email, subscription } = req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    }
  })
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    await service.updateById(id, {token: null});
    res.status(204).json({
      status: 'success',
      code: 204,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { signup, login, getCurrent, logout }