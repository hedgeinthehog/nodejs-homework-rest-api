const { contacts: service } = require('../services');

const getAll = async (_, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: contacts,
    });
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await service.getContactById(contactId);
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
};

const create = async (req, res, next) => {
  const { body } = req;

  try {
    const newContact = await service.createContact(body);
    res.json({
      status: 'success',
      code: 201,
      data: newContact,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const removedContact = await service.removeContact(contactId);
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
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing fields',
    });

    return;
  }

  try {
    const updatedContact = await service.updateContact(contactId, body);
    if (!updatedContact) {
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
      data: updatedContact,
    });
  } catch (e) {
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!body || !body.favorite) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing field favorite',
    });

    return;
  }

  try {
    const updatedContact = await service.updateFavorite(contactId, body);
    if (!updatedContact) {
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
      data: updatedContact,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll, getOne, create, remove, update, updateFavorite };
