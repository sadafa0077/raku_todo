"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const app = express();

const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '7ed43b3fd1b68c8d98825db51b7deded',
    channelAccessToken: 'fXr3W72D9GLR9KYVj1zZFVdcnYvAvt/x5+UR44Ljt9vsE9Mw3hCCLZ7UWm9CmPIxgXguIp/i0NYhWKDmRQDH56Go0Mpy6ZeNs838ekP7s0nkDAoWeaamBio1qNOMJmVntSpWl2rmX273QPNWXJTCfQdB04t89/1O/w1cDnyilFU='
};

const client = new line.Client(config);

// ! ここから
app.post("/webhook", line.middleware(config), async (req, res) => {
    const event = req.body.events[0];

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
            text: "seikou",
        });
    }

    res.json(result);
});
// !ここまで

app.listen(PORT, console.log(`Server listning on port ${PORT}`));
