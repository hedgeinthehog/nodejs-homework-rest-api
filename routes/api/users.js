const express = require('express');
const router = express.Router();
const { 
  auth,
} = require('../../middlewares');
const {
  validateSignup,
  validateLogin,
} = require('../../validation/users');
const {users : ctrl} = require('../../controllers');

router.get('/current', auth, ctrl.getCurrent);

router.post('/signup', validateSignup, ctrl.signup); 
router.post('/login', validateLogin, ctrl.login);
router.post('/logout', auth, ctrl.logout)

module.exports = router;