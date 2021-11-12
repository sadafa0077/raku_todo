"use strict";

require('dotenv').config();

const express = require("express");
const line = require("@line/bot-sdk");
const app = express();
const prisma = require("@prisma/client");

const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const client = new line.Client(config);

// ! ここから
app.post("/webhook", line.middleware(config), async (req, res) => {
    const event = req.body.events[0];
    console.log(event);

    const text = event.message.text;

    let result;
    if (text === "todo") {
        result = await client.replyMessage(event.replyToken, {
            "type": "template",
            "altText": "This is a buttons template",
            "template": {
                "type": "buttons",
                "title": "Menu",
                "text": "Please select",
                "actions": [
                    {
                        "type": "message",
                        "label": "作成",
                        "text": "作成"
                    },
                    {
                        "type": "message",
                        "label": "閲覧",
                        "text": "閲覧"
                    },
                    {
                        "type": "message",
                        "label": "削除",
                        "text": "削除"
                    },
                    {
                        "type": "message",
                        "label": "更新",
                        "text": "更新"
                    },
                ]
            }
        });
    }
    if (text === "作成") {
        result = await client.replyMessage(event.replyToken, {
            type: "text",
            text: "入力してください",
        });

    }

    if (text === "閲覧") {
        result = await client.replyMessage(event.replyToken, {

        });
    }

    res.json(result);
});
// !ここまで

app.listen(PORT, console.log(`Server listning on port ${PORT}`));
