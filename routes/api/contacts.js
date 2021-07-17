const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateContactId,
} = require('../../validation/contacts');
const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll).post('/', validateCreateContact, ctrl.create);

router
  .get('/:contactId', validateContactId, ctrl.getOne)
  .put('/:contactId', validateContactId, validateUpdateContact, ctrl.update)
  .delete('/:contactId', validateContactId, ctrl.remove)
  .patch('/:contactId/favorite', validateContactId, ctrl.updateFavorite);

module.exports = router;
