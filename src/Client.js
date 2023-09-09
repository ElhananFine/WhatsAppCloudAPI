const EventEmitter = require("events");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { MessageText } = require("./Models/Template");
const { Messsage, updateMessage } = require("./Models/Message");
const { saveFileToDisk } = require("./Controllers/utils");
const URL = "https://graph.facebook.com";

class Whatsapp extends EventEmitter {
  constructor(phoneID, sendToken, verifyToken, callBack, apiVersion = "17.0") {
    super();
    this.phoneID = phoneID;
    this.sendToken = sendToken;
    this.verifyToken = verifyToken;
    this.apiVersion = apiVersion;
    this.app = callBack;
    this.URL = "https://graph.facebook.com";

    this.initWebHook();
  }

  async initWebHook() {
    this.app.get("/Whatsapp2", async (req, res) => {
      const token = req.query["hub.verify_token"]?.toString();
      const challenge = req.query["hub.challenge"]?.toString();
      const validToken = token != null && token == this.verifyToken;
      validToken ? res.send(challenge) : res.status(400).send();
    });
    this.app.post("/Whatsapp2", async (req, res) => {
      // prettier-ignore
      if (req.body.entry && req.body.entry[0] && req.body.entry[0].changes && req.body.entry[0].changes[0].value) {
          const objPath = req.body.entry[0].changes[0].value;
          const { contacts, metadata } = req.body.entry[0].changes[0].value;
        
          if (objPath.messages) {
            const msgObj = objPath.messages[0];
            const isContext = typeof msgObj.context != "undefined"
            const isInteractive = msgObj.type === "interactive";
            const isText = msgObj.type === "text";
            const isContacts = msgObj.type === "contacts";
            const allowedMedia = ['image', 'video', 'sticker', 'document'].includes(msgObj.type)
            let bodyOfMsg;
            if (isInteractive) bodyOfMsg = msgObj.interactive[msgObj.interactive.type]
            else if (isText) bodyOfMsg = msgObj.text.body
            else if (allowedMedia) bodyOfMsg = msgObj[msgObj.type]
            else if (isContacts) bodyOfMsg = msgObj[msgObj.type]
            // prettier-ignore
            this.emit("messages", new Messsage(msgObj.from, contacts[0].profile.name, bodyOfMsg, msgObj.id, metadata.display_phone_number, metadata.phone_number_id, this.sendToken, new Date(msgObj.timestamp * 1000).toLocaleString(), this.apiVersion, msgObj.type, allowedMedia, isContext, isContext ? msgObj.context : undefined, this.sendMessage));
          } else if (objPath.statuses) {
            const status = objPath.statuses[0].status;
            // prettier-ignore
            if (["read", "sent", "delivered"].includes(status)) this.emit('update', new updateMessage(objPath.statuses[0].id, metadata.phone_number_id, this.sendToken, status, new Date(objPath.statuses[0].timestamp * 1000).toLocaleString(), this.apiVersion, objPath.statuses[0].recipient_id, objPath.statuses[0].pricing || {pricing: 'There is no charge for this action'}));
          }
          res.status(200).send("Sucsees");
        } else {
          res.status(400).send("Bad request");
        }
    });
  }

  async sendMessage(obj, number) {
    // prettier-ignore
    const messageobj = typeof obj === "string" ? { ...MessageText(obj), to: number } : { ...obj, to: number };
    try {
      // prettier-ignore
      const response = await axios.post(`${this.URL}/v${this.apiVersion}/${this.phoneNunerID ? this.phoneNunerID : this.phoneID}/messages`, JSON.stringify(messageobj), {headers: {"Content-Type": "application/json", Authorization: `Bearer ${this.Token ? this.Token: this.sendToken}`}});
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }

  async updladMedia(data, bolyan = false) {
    const filePath = await saveFileToDisk(data);
    // prettier-ignore
    try {
      await fs.promises.access(filePath, fs.constants.F_OK)
     } catch (e) {
      throw new Error("no access to file")
     }

    const formdata = new FormData();
    formdata.append("messaging_product", "whatsapp");
    formdata.append("file", fs.createReadStream(filePath));
    formdata.append("type", data.mimetype);

    try {
      // prettier-ignore
      const response = await axios.post(`${URL}/v${this.apiVersion}/${data.phoneID}/media`, formdata, {headers: {...formdata.getHeaders(), Authorization: `Bearer ${this.sendToken}`}})
      if (!bolyan) setTimeout(() => fs.unlinkSync(filePath), 300000);
      return response.data.id;
    } catch (e) {
      console.log(e);
      return e?.response?.data;
    }
  }

  async deleteMedia(mediaID) {
    try {
      // prettier-ignore
      const response = await axios.delete(`${this.URL}/v${this.apiVersion}/${mediaID}`, {params: {phone_number_id: this.phoneNunerID}, headers: {Authorization: `Bearer ${this.Token}`}});
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
}

module.exports = { Whatsapp };
