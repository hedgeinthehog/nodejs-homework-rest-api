const { User } = require('../model');

const getOne = filter => {
  return User.findOne(filter);
}

const create = ({email, password, subscription}) => {
  const newUser = new User({email, subscription});
  newUser.setPassword(password);
  return newUser.save();
}

const updateById = (id, updateIfo) => {
  return User.findByIdAndUpdate(id, updateIfo);
}

module.exports = {getOne, create, updateById}