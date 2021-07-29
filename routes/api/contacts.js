const express = require('express');
const router = express.Router();
const { 
  auth,
} = require('../../middlewares');
const {
  validateCreateContact,
  validateUpdateContact,
  validateContactId,
} = require('../../validation/contacts');
const { contacts: ctrl } = require('../../controllers');

router.get('/', auth, ctrl.getAll).post('/', auth, validateCreateContact, ctrl.create);

router
  .get('/:contactId', auth, validateContactId, ctrl.getOne)
  .put('/:contactId', auth, validateContactId, validateUpdateContact, ctrl.update)
  .delete('/:contactId', auth, validateContactId, ctrl.remove)
  .patch('/:contactId/favorite', auth, validateContactId, ctrl.updateFavorite);

module.exports = router;
