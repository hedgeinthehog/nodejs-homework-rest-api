const contacts = require('./contacts.json');

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find(
    (contact) => contact.id.toString() === contactId
  );
  return contact;
};

const removeContact = async (contactId) => {
  const contactIdx = contacts
    .map((contact) => contact.id.toString())
    .indexOf(contactId);

  if (contactIdx === -1) return null;

  contacts.splice(contactIdx, 1);
  return 1;
};

const addContact = async (body) => {
  contacts.push(body);
};

const updateContact = async (contactId, body) => {
  const contact = contacts.find(
    (contact) => contact.id.toString() === contactId
  );

  if (!contact) return null;

  const updatedContact = Object.assign(contact, body);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
