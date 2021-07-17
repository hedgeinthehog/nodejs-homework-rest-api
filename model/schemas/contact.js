const { Schema } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Must be longer than 2'],
      maxlength: [30, 'Must be shorter than 30'],
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Set email for contact'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Set phone number for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = contactSchema;
