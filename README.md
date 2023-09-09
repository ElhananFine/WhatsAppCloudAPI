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
