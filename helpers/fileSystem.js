const fs = require('fs').promises;

const isAccessible = (dirOrFolderpath) => {
  return fs
    .access(dirOrFolderpath)
    .then(() => true)
    .catch(() => false);
}

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = {
  isAccessible,
  createFolderIfNotExist,
}