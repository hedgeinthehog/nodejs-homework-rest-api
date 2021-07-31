const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { contactSchema } = require('./schemas');
const { userSchema } = require('./schemas');

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('contact', contactSchema);
const User = mongoose.model('user', userSchema);

module.exports = { Contact, User };
