# WhatsappAPI

**WhatsappAPI is a simple and lightweight library for building WhatsApp bots using the WhatsApp Cloud API.**

**Please note: This project is a work in progress (WIP), and there will be breaking changes in future releases that will be released soon.**

# installation

```bash
npm i whapis
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

# Client:
The `Whatsapp` object exposes the following functions:

- `sendMessage`: This function is used to send a message. It accepts parameters for text or media, as well as a phone number. It sends the message to the client and returns an object with the message ID.

- `uploadMedia`: The `uploadMedia` function receives information returned from the `downloadMedia` function when a media message is received. It uploads the media to WhatsApp. Optionally, you can pass a second boolean parameter indicating whether to save the file in the file system. The function returns the media ID (which is later sent in a media message to the client). If the second parameter is `true`, it also returns the path to the file in the file system.

- `deleteMedia`: This function takes the media ID of the uploaded media and deletes it from WhatsApp's servers. It returns a success status.

# Objects:

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

Object `update` content:
- `msgID`: The ID of the message for which the update is received (string).
- `phoneNumberID`: Your phone's identifier (string).
- `status`: The status of the update (e.g., message sent, read, etc.) (string).
- `time`: The timestamp of when the message was received (date).
- `recipient_id`: The ID of the recipient (string).
- `pricing`: If the message involves payment, it contains an object with payment details (module, status, etc.). Otherwise, it contains an object with a `pricing` key indicating no payment is required (string).

This object does not expose any functions.

# Object MessageMedia
The library exposes MessageMedia objects, which can be used to construct media messages passed to the sendMessage, sendToNum, and reply functions.

Existing media message objects:
1. MessageText - Receives text content and an optional Boolean parameter for link previews.
2. Image - Accepts an ID or link to an image.
3. ReplyEmojiToMsg - Receives an emoji for quick responses to messages.
4. Audio - Accepts a link or ID for audio.
5. Document - Accepts a link or ID, along with optional parameters for caption and filename.
6. Sticker - Accepts an ID or link.
7. Video - Accepts an ID or link, along with an optional caption parameter.
8. Location - Under development.
9. Contacts - Under development.
10. List / Buttons - Documentation in progress.

Example: 
```js
MessageText("Text", true);
Image(idOrLink);
ReplyEmojyToMsg(emojy);
audio(idOrLink);
document(idOrLink, caption, filename);
sticker(idOrLink);
video(idOrLink, caption);

// In Process
new List(), new Buttoms(), contacts(), location()
```

# Helper Functions

The library exposes the following helper functions:

1. `parsePhoneNumbers` - This function takes a single parameter, which is a phone number in international format (you can use `msg.from`). The function returns an object that contains the following properties:
   - `country` - The country to which the number belongs.
   - `countryCallingCode` - The phone prefix for that country.
   - `number` - The phone number.
   - `formatNational` - The phone number in the local format of that country.
   - `formatInternational` - The phone number in international format.
   - `valid` - Indicates whether the phone number is valid.

2. `isLinkOrID` - This function checks whether a specific input is a valid ID or a valid link for sending media on WhatsApp.


**The continuation of documentation and development will be uploaded gradually. In the near future, I hope to upload several libraries, so stay tuned! 😃**

# Supported features

# Contributing
Pull requests are welcome! If you see something you'd like to add, please do. For drastic changes, please open an issue first.

# Disclaimer
This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates. The official WhatsApp website can be found at https://whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.
