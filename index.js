const { Whatsapp } = require("./src/Client");
// prettier-ignore
const {document, sticker, contacts, markAsRead, MessageText, List, Buttoms, Image, ReplyEmojyToMsg, audio, location, video} = require("./src/Models/Template")
const { parsePhoneNumbers } = require("./src/Controllers/utils");

// prettier-ignore
module.exports = { document, sticker, contacts, markAsRead, MessageText, List, Buttoms, Image, ReplyEmojyToMsg, audio, location, video, parsePhoneNumbers  };

////////////////////////////////////////////////////////////////
