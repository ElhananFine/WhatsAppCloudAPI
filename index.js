const { Whatsapp } = require("./src/Client");
// prettier-ignore
const {markAsRead, MessageText, List, Buttoms, ImageByID} = require("./src/Models/Template")
const { parsePhoneNumbers } = require("./src/Controllers/utils");

// prettier-ignore
module.exports = { Whatsapp, markAsRead, MessageText, List, Buttoms, parsePhoneNumbers };

////////////////////////////////////////////////////////////////
