const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../model');

const getOne = filter => {
  return User.findOne(filter);
}

const create = ({ email, password, subscription }) => {
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  return newUser.save();
}

const updateById = (id, updateIfo) => {
  return User.findByIdAndUpdate(id, updateIfo);
}

const updateAvatar = async (id, pathFile) => {
  const AVATAR_DIR = path.join(process.cwd(), 'public', 'avatars');

  try {
    if (pathFile) {
      const img = await Jimp.read(pathFile);
      await img
        .autocrop()
        .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(pathFile);
      const avatarURL = path.join(AVATAR_DIR, `${id}.jpg`);
      await fs.rename(pathFile, avatarURL);
      await User.findByIdAndUpdate(id, { avatarURL })
      return avatarURL;
    }
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { getOne, create, updateById, updateAvatar }