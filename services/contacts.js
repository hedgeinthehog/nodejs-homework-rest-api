const { Contact } = require('../model');

const listContacts = async () => Contact.find({});

const getContactById = async (id) => Contact.findById({ _id: id });

const createContact = async (contact) => Contact.create(contact);

const updateContact = async (id, fields) =>
  Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

const removeContact = async (id) => Contact.findByIdAndRemove({ _id: id });

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
