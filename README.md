# WhatsappAPIs

**WhatsappAPIs is a simple and lightweight library for building WhatsApp bots using the WhatsApp Cloud API.**

**Please note: This project is a work in progress (WIP), and there will be breaking changes in future releases that will be released soon.**

# installation

```bash
npm install whatsappapis
```

# Setup and Usage

```js
const { Whatsapp } = require("whapis");

const serverToWebhook = require("express")();
serverToWebhook.listen(3000);

const Client = new Whatsapp(phoneID, Token, verifyToken, serverToWebhook);

Client.on("messages", async (msg) => {
  if (msg.body === "ping") await msg.reply("pong");
});

Client.on("updates", async (update) => {});

```

# listening
The Whatsapp object exposes two listeners:

The messages listener emits an event when a message is received, whether it's a text message or media message.
The updates listener emits an event when an update message is received. For example, when a message is sent, received, read, or deleted by the user.
Listening to these events is straightforward and can be done using the ``` client.on("event-name") ``` method. The listener emits a single object that can be received as a callback.

# Objects:
Here's the translation of your documentation into English:

**Message Object Contents:**
- `from` - Sender's phone number (string)
- `nameOfFrom` - Sender's name (string)
- `body` - Message body (string). In the case of media messages, it contains an object with additional information.
- `msgID` - Message ID (string)
- `yourNumber` - Your phone number (string)
- `phoneNunerID` - Your phone's identifier (string)
- `time` - Message timestamp (date)
- `type` - Message type. In the case of media messages, it specifies the type of media (e.g., document, image, contact, etc.) (string)
- `hasMedia` - Does the message contain media? (boolean)
- `isReply` - Is the message a reply to another message? (boolean)
- `contacts` - If it's a reply, this object contains the ID of the replied-to message (object)
- `noText` - In case the message does not contain text (boolean)

**The object also exposes the following functions:**
- `reply` - Used to reply to the message, allowing text or media replies (details below).
- `sendToNum` - Sending a message to a specific number, not as a reply. It accepts text or media.
- `markAsRead` - Marks the message as read.
- `fastEmojiResponse` - Provides a quick response using an emoji as a reply. It only accepts emojis.
- `downloadMedia` - Used to download media when dealing with media messages. Important: You should check if the media download was successful, or you will receive an error.


# Supported features

# Contributing
