function generateFileName(userId) {
  const date = new Date();
  const fileName =
    userId +
    "_" +
    date.getFullYear() +
    date.getMonth() +
    date.getDate() +
    date.getMinutes() +
    date.getSeconds();
  return fileName;
}
module.exports = { generateFileName };
