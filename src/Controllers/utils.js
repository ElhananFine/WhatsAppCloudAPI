const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const { parsePhoneNumber } = require("libphonenumber-js");

const saveFileToDisk = async (data) => {
  const dirPath = path.join(__dirname, "../Files");
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  const mimeTypeExtention = data.mimetype.split("/")[1];
  //prettier-ignore
  const allowedExtensions = ['aac', 'mp4', 'mpeg', 'amr', 'ogg', 'txt', 'pdf', 'ppt', 'doc', 'docx', 'pptx', 'xlsx', 'jpeg', 'jpg', 'png', 'mp4', '3gp', 'webp',].includes(mimeTypeExtention);
  if (!allowedExtensions) throw new Error("File type not allowed");

  const filepath = path.join(dirPath, `${uuid.v4()}.${mimeTypeExtention}`);
  //prettier-ignore
  if (data.mimetype.startsWith('audio')) fs.writeFileSync(filepath, data.base64Media, 'binary');
  else fs.writeFileSync(filepath, data.base64Media, 'base64');

  return filepath;
};

const parsePhoneNumbers = (phone) => {
  const rezult = parsePhoneNumber("+" + phone.toString());
  // prettier-ignore
  return { country: rezult.country, countryCallingCode: rezult.countryCallingCode, number: rezult.number, formatNational: rezult.formatNational(), formatInternational: rezult.formatInternational(), valid: rezult.isValid() };
};

const isLinkOrID = (inputString) => {
  if (/^\d+$/.test(inputString)) return "ID";
  if (/^(https?|www)/i.test(inputString)) return "Link";
  return false;
};

module.exports = { saveFileToDisk, parsePhoneNumbers, isLinkOrID };
