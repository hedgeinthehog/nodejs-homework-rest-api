const { Contact } = require('../model');

const listContacts = async (userId, { limit = 5, page = 1, favorite = false }) => {
  const { docs, totalDocs } = await Contact.paginate({ owner: userId }, {
    limit,
    page,
  });

  const contacts = favorite ? docs.filter(doc => doc.favorite) : docs;
  const total = favorite ? contacts.length : totalDocs;

  return { contacts, total, limit: Number(limit), page: Number(page) };
};

const getContactById = async (userId, id) => {
  const result = await Contact.findById({ _id: id, owner: userId });
  return result;
};

const createContact = async (userId, contact) => {
  const result = await Contact.create({ ...contact, owner: userId });
  return result;
};

const updateContact = async (userId, id, fields) => {
  const result = await Contact.findByIdAndUpdate({ _id: id, owner: userId }, fields, { new: true });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

const updateFavorite = async (userId, id, { favorite }) => {
  const result = Contact.findByIdAndUpdate({ _id: id, owner: userId }, { favorite }, { new: true });
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
