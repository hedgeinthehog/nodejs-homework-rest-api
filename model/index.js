const { model } = require('mongoose');
const { contactSchema } = require('./schemas');
const { userSchema } = require('./schemas');

const Contact = model('contact', contactSchema);
const User = model('user', userSchema);

module.exports = { Contact, User };
