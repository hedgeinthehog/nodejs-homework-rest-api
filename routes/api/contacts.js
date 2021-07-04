const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const model = require('../../model');

router.get('/', async (_, res, next) => {
  try {
    const contacts = await model.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: contacts,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await model.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });

      return;
    }

    res.json({
      status: 'success',
      code: 200,
      data: contact,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;

  if (!(body.name && body.email && body.phone)) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });

    return;
  }

  const newContact = Object.assign({}, body, { id: uuidv4() });

  try {
    await model.addContact(newContact);
    res.json({
      status: 'success',
      code: 201,
      data: newContact,
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const removedContact = await model.removeContact(contactId);
    console.log(removedContact);
    if (!removedContact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });

      return;
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    });
  } catch (e) {
    next(e);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing fields',
    });
  }

  try {
    const updatedContact = await model.updateContact(contactId, body);
    if (!updatedContact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }

    res.json({
      status: 'success',
      code: 200,
      data: updatedContact,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
