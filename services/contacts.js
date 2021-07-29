const { Contact } = require('../model');

const listContacts = async ({ limit = 5, page = 1 }) => {
  const { docs: contacts, totalDocs: total} = await Contact.paginate({}, {
    limit,
    page,
  });
  return { contacts, total, limit: Number(limit), page: Number(page) };
};

const getContactById = async (id) => {
  const result = await Contact.findById({ _id: id });
  return result;
};

const createContact = async (contact, userId) => {
  const result = await Contact.create({...contact, owner: userId});
  return result;
};

const updateContact = async (id, fields) => {
  const result = await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove({ _id: id });
  return result;
};

const updateFavorite = async (id, { favorite }) => {
  const result = Contact.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateFavorite,
};
