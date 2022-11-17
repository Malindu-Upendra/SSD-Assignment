const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Message = require("./model/MessageModel");

const port = 5000;

app.use(cors());
app.use(express.json());

const SslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "certificate", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certificate", "cert.pem")),
  },
  app
);

mongoose.connect(
  "mongodb+srv://malindu:dVgLdaOYojXh9s4Q@cluster0.llqork1.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/retrieveMessages/:username", async (req, res) => {
  try {
    const username = req.params.username;
    if (req.headers.authorization) {
      const messages = await Message.find({ username: username });

      res.send({ data: messages, success: true });
    }else{
      res.send({ success: false})
    }
  } catch (e) {
    res.send(e);
  }
});

app.post("/createMessage", async (req, res) => {
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();

  const dateString =
    currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
  try {
    const message = new Message({
      name: req.body.name,
      username: req.body.username,
      description: req.body.description,
      createdAt: dateString,
      type: req.body.type,
    });
    const result = await message.save();
    res.send({ result, success: true });
  } catch (e) {
    res.send(e);
  }
});

SslServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
