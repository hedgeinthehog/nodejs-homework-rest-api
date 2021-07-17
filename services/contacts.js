const { Contact } = require('../model');

const listContacts = async () => Contact.find({});

const getContactById = async (id) => Contact.findById({ _id: id });

const createContact = async (contact) => Contact.create(contact);

const updateContact = async (id, fields) =>
  Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

const removeContact = async (id) => Contact.findByIdAndRemove({ _id: id });

const updateFavorite = async (id, { favorite }) =>
  Contact.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateFavorite,
};
