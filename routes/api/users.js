const express = require('express');
const router = express.Router();
const { 
  auth,
} = require('../../middlewares');
const {
  validateSignup,
  validateLogin,
  validateSubscription,
} = require('../../validation/users');
const upload = require('../../helpers/multer');
const {users : ctrl} = require('../../controllers');

router.get('/current', auth, ctrl.getCurrent);
router.get('/verify/:verificationToken', ctrl.verify)

router.post('/signup', validateSignup, ctrl.signup); 
router.post('/login', validateLogin, ctrl.login);
router.post('/logout', auth, ctrl.logout);

router.patch('/', auth, validateSubscription, ctrl.updateSubscription);
router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router;