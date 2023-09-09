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



# Supported features

# Contributing
