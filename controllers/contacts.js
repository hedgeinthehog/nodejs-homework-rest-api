const { contacts: service } = require('../services');

const getAll = async (req, res, next) => {
  const { query } = req;
  const userId = req.user.id;
  try {
    const contacts = await service.listContacts(userId, query);
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
  const userId = req.user.id;

  try {
    const contact = await service.getContactById(userId, contactId);
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
  const userId = req.user.id;

  try {
    const newContact = await service.createContact(userId, body);
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
  const userId = req.user.id;

  try {
    const removedContact = await service.removeContact(userId, contactId);
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
  const userId = req.user.id;
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
    const updatedContact = await service.updateContact(userId, contactId, body);
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
  const userId = req.user.id;
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
    const updatedContact = await service.updateFavorite(userId, contactId, body);
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
