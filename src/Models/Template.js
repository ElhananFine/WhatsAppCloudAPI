const { isLinkOrID } = require("../Controllers/utils");
class List {
  constructor(
    headerText = "",
    bodyText = "",
    footerText = "",
    buttonText = "",
    sections = []
  ) {
    if (bodyText.length < 1 || bodyText.length > 1024)
      throw new Error("invalid Length");

    //prettier-ignore
    if (!typeof headerText === "string" && !typeof footerText === "string" && !typeof buttonText === "string") throw new Error("invalud type");

    this.data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: headerText,
        },
        body: {
          text: bodyText,
        },
        footer: {
          text: footerText,
        },
        action: {
          button: buttonText,
          sections: [{ rows: sections }],
        },
      },
    };
  }
}

class Buttoms {
  constructor(header, body, footer, buttons) {
    if (!buttons) throw new Error("buttons Error");
    this.data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      type: "interactive",
      interactive: {
        type: "button",
        header: header || {},
        body: {
          text: body || "",
        },
        footer: footer ? { text: footer } : undefined,
        action: {
          buttons: buttons || [],
        },
      },
    };
  }
}

const markAsRead = (ID) => {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    status: "read",
    message_id: ID,
  });
  return data;
};

const MessageText = (textResponse, preview_url = true) => {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "text",
    text: {
      preview_url,
      body: textResponse,
    },
  };
  return data;
};

const Image = (IDImage) => {
  const type = isLinkOrID(IDImage.toString());

  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "image",
    image: {},
  };

  //prettier-ignore
  type && type == "ID" ? data.image.id = IDImage : data.image.link = IDImage
  return data;
};

const ReplyEmojyToMsg = (msgID, emoji) => {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "reaction",
    reaction: {
      message_id: msgID,
      emoji,
    },
  };
  return data;
};

const audio = (IDAudio) => {
  const type = isLinkOrID(IDAudio.toString());
  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "audio",
    audio: {},
  };

  //prettier-ignore
  type && type == "ID" ? data.audio.id = IDAudio : data.audio.link = IDAudio
  return data;
};
const document = (linkDocument, caption = false, filename = false) => {
  const type = isLinkOrID(linkDocument.toString());

  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "document",
    document: {},
  };
  //prettier-ignore
  type && type == "ID" ? data.document.id = linkDocument : data.document.link = linkDocument
  if (caption) data.document.caption = caption;
  if (filename) data.document.filename = filename;
  return data;
};
const sticker = (IDSticker) => {
  const type = isLinkOrID(IDSticker.toString());

  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "sticker",
    sticker: {},
  };
  //prettier-ignore
  type && type == "ID" ? data.sticker.id = IDSticker : data.sticker.link = IDSticker
};

const video = (linkVideo, caption = false) => {
  const type = isLinkOrID(linkVideo.toString());

  const data = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    type: "video",
    video: {},
  };
  //prettier-ignore
  type && type == "ID"? data.video.id = linkVideo : data.video.link = linkVideo
  if (caption) data.video.caption = caption;
  return data;
};
const contacts = (contacts) => {};
const location = (location) => {};

// prettier-ignore
module.exports = {document, sticker, contacts, markAsRead, MessageText, List, Buttoms, Image, ReplyEmojyToMsg, audio, location, video,};
