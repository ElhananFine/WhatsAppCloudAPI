const template = require("./Template");
const axios = require("axios");

class Messsage {
  // prettier-ignore
  constructor(from, nameOfFrom, body = "", msgID, yourNumber, phoneNunerID, Token, time, apiVersion, type, hasMedia, contact, contacts, sendMessage, sendMessageHendler) {
  // prettier-ignore
  this.from = from, this.nameOfFrom = nameOfFrom, this.body = body, this.msgID = msgID, this.yourNumber = yourNumber, this.phoneNunerID = phoneNunerID, this.Token = Token, this.time = time, this.apiVersion = apiVersion, this.type = type, this.hasMedia = hasMedia, this.isReply = contact, this.sendMessage = sendMessage, this.URL = "https://graph.facebook.com", this.noText = typeof body == "object"
    if (this.isReply) this.contactsReply = contacts
}

  async reply(obj) {
    // prettier-ignore
    const msgObj = typeof obj === "string" ? { ...template.MessageText(obj), context: {message_id: this.msgID}} : { ...obj, context: {message_id: this.msgID} }
    return await this.sendMessage(msgObj, this.from);
  }

  async sendToNum(obj) {
    // prettier-ignore
    const msgObj = typeof obj === "string" ? { ...template.MessageText(obj), to: this.from } : { ...obj, to: this.from };
    return await this.sendMessage(msgObj, this.from);
  }

  async markAsRead() {
    try {
      // prettier-ignore
      const res =  await axios.post(`${this.URL}/v${this.apiVersion}/${this.phoneNunerID}/messages`, template.markAsRead(this.msgID), {headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.Token}`}});
      return res.data;
    } catch (e) {
      return e?.data;
    }
  }

  async fastEmojiResponse(emoji) {
    if (!/[\uD800-\uDFFF]./.test(emoji)) throw new Error("Invalid type.");

    return await this.sendMessage(
      template.ReplyEmojyToMsg(this.msgID, emoji),
      this.from
    );
  }

  async downloadMedia() {
    if (!this.hasMedia) throw new Error("There is no media in the message");
    // prettier-ignore

    const response = await axios.get(`${this.URL}/v${this.apiVersion}/${this.body.id}`, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.Token}`}});
    const base64 = await axios.get(response.data.url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.Token}`,
      },
      responseType: "arraybuffer",
    });
    // prettier-ignore
    return { mimetype: response.data.mime_type, fileSize: response.data.file_size, base64Media: Buffer.from(base64.data, 'binary').toString('base64'), phoneID: this.phoneNunerID };
  }
}

class updateMessage {
  // prettier-ignore
  constructor(msgID, phoneNumberID, token, status, time, apiVersion, recipient, pricing = {}) {this.msgID = msgID, this.phoneNumberID = phoneNumberID, this.token = token, this.status = status, this.time = time, this.apiVersion = apiVersion, this.recipient = recipient, this.pricing = pricing}
}

module.exports = { Messsage, updateMessage };
